<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\User;
use App\Models\Participant;
use App\Services\EmailService;
use App\Mail\EmailVerification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected EmailService $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Registrar un nuevo usuario
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'participant',
            'phone' => $validated['phone'] ?? null,
            'bio' => $validated['bio'] ?? null,
        ]);

        // Crear participante automáticamente si el usuario es participante
        if ($user->role === 'participant') {
            try {
                $name = $validated['name'];
                $participant = Participant::create([
                    'first_name' => $validated['firstName'] ?? explode(' ', $name)[0],
                    'last_name' => $validated['lastName'] ?? (count(explode(' ', $name)) > 1 ? implode(' ', array_slice(explode(' ', $name), 1)) : ''),
                    'email' => $validated['email'],
                    'phone' => $validated['phone'] ?? null,
                        'type' => $validated['type'] ?? (str_contains($validated['email'], '@miumg.edu.gt') ? 'interno' : 'externo'),
                    'school' => $validated['school'] ?? null,
                    'student_id' => $validated['studentId'] ?? null,
                    'is_active' => true,
                    'email_verified' => false,
                ]);

                Log::info('Participant created successfully', [
                    'user_id' => $user->id,
                    'participant_id' => $participant->id,
                    'email' => $user->email
                ]);
            } catch (\Exception $e) {
                Log::error('Error creating participant: ' . $e->getMessage());
                // No fallar el registro si no se puede crear el participante
            }
        }

        // Enviar email de verificación automáticamente
        try {
            $verificationUrl = url('/verify-email?token=' . $user->id . '&email=' . urlencode($user->email));
            
            // Configurar SMTP manualmente para asegurar el envío
            config([
                'mail.default' => 'smtp',
                'mail.mailers.smtp.host' => 'smtp.gmail.com',
                'mail.mailers.smtp.port' => 587,
                'mail.mailers.smtp.username' => 'jhoannac000@gmail.com',
                'mail.mailers.smtp.password' => 'jtiajrnjtapvcqbu',
                'mail.mailers.smtp.encryption' => 'tls',
                'mail.from.address' => 'jhoannac000@gmail.com',
                'mail.from.name' => 'Congreso de Tecnología UMG',
            ]);
            
            // Enviar email
            Mail::to($user->email)->send(new EmailVerification($user, $verificationUrl));
        } catch (\Exception $e) {
            Log::error('Error enviando email de verificación: ' . $e->getMessage());
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Buscar el participante creado para incluirlo en la respuesta
        $participant = null;
        if ($user->role === 'participant') {
            $participant = Participant::where('email', $user->email)->first();
        }

        return response()->json([
            'message' => 'Usuario registrado exitosamente. Se ha enviado un email de verificación.',
            'user' => $user,
            'participant' => $participant,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Iniciar sesión
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        $user = User::where('email', $request->email)->first();
        
        if (!$user->is_active) {
            throw ValidationException::withMessages([
                'email' => ['Tu cuenta está desactivada. Contacta al administrador.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Cerrar sesión
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada exitosamente',
        ]);
    }

    /**
     * Obtener información del usuario autenticado
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Refrescar token
     */
    public function refresh(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->tokens()->delete();
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Token renovado exitosamente',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
