<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Participant;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * Crear un nuevo pago para una actividad
     */
    public function create(Request $request, Activity $activity)
    {
        $request->validate([
            'participant_id' => ['required', 'exists:participants,id'],
            'payment_method' => ['required', 'in:cash,bank_transfer,card,paypal,visanet'],
            'reference_number' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $participant = Participant::find($request->participant_id);

        // Verificar que la actividad requiere pago
        if (!$activity->requiresPayment()) {
            return response()->json([
                'message' => 'Esta actividad no requiere pago.'
            ], 400);
        }

        // Verificar si ya existe un pago completado
        $existingPayment = Payment::where('participant_id', $participant->id)
            ->where('activity_id', $activity->id)
            ->where('status', 'completed')
            ->first();

        if ($existingPayment) {
            return response()->json([
                'message' => 'Ya has realizado el pago para esta actividad.',
                'payment' => $existingPayment
            ], 409);
        }

        // Verificar si hay un pago pendiente
        $pendingPayment = Payment::where('participant_id', $participant->id)
            ->where('activity_id', $activity->id)
            ->where('status', 'pending')
            ->first();

        if ($pendingPayment) {
            return response()->json([
                'message' => 'Ya tienes un pago pendiente para esta actividad.',
                'payment' => $pendingPayment
            ], 409);
        }

        DB::beginTransaction();
        try {
            // Crear el pago
            $payment = Payment::create([
                'participant_id' => $participant->id,
                'activity_id' => $activity->id,
                'amount' => $activity->price,
                'currency' => $activity->currency,
                'payment_method' => $request->payment_method,
                'status' => 'pending',
                'transaction_id' => 'TXN_' . Str::upper(Str::random(12)) . '_' . time(),
                'reference_number' => $request->reference_number,
                'notes' => $request->notes,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pago creado exitosamente. Por favor, realiza la transferencia y sube tu comprobante.',
                'payment' => $payment,
                'payment_instructions' => $this->getPaymentInstructions($request->payment_method, $activity)
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al crear pago: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al procesar el pago.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Subir comprobante de pago
     */
    public function uploadProof(Request $request, Payment $payment)
    {
        $request->validate([
            'payment_proof' => ['required', 'image', 'mimes:jpeg,png,jpg,pdf', 'max:5120'], // 5MB máximo
        ]);

        if ($payment->status === 'completed') {
            return response()->json([
                'message' => 'Este pago ya ha sido completado.'
            ], 400);
        }

        try {
            // Guardar el archivo
            $file = $request->file('payment_proof');
            $filename = 'payment_' . $payment->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('payments', $filename, 'public');

            // Actualizar el pago
            $payment->update([
                'payment_proof' => '/storage/' . $path,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Comprobante de pago subido exitosamente. Está en revisión.',
                'payment' => $payment->fresh()
            ]);

        } catch (\Exception $e) {
            Log::error('Error al subir comprobante de pago: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al subir el comprobante.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Confirmar pago (solo administradores)
     */
    public function confirm(Request $request, Payment $payment)
    {
        if ($payment->status === 'completed') {
            return response()->json([
                'message' => 'Este pago ya ha sido confirmado.'
            ], 400);
        }

        $payment->markAsCompleted();

        return response()->json([
            'success' => true,
            'message' => 'Pago confirmado exitosamente.',
            'payment' => $payment->fresh()
        ]);
    }

    /**
     * Rechazar pago (solo administradores)
     */
    public function reject(Request $request, Payment $payment)
    {
        $request->validate([
            'reason' => ['required', 'string', 'max:500'],
        ]);

        $payment->update([
            'status' => 'failed',
            'notes' => $request->reason,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pago rechazado.',
            'payment' => $payment->fresh()
        ]);
    }

    /**
     * Obtener pagos de un participante
     */
    public function myPayments(Request $request)
    {
        $request->validate([
            'participant_id' => ['required', 'exists:participants,id'],
        ]);

        $payments = Payment::with(['activity.category'])
            ->where('participant_id', $request->participant_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }

    /**
     * Verificar estado de pago de una actividad
     */
    public function checkPaymentStatus(Request $request, Activity $activity)
    {
        $request->validate([
            'participant_id' => ['required', 'exists:participants,id'],
        ]);

        $payment = Payment::where('participant_id', $request->participant_id)
            ->where('activity_id', $activity->id)
            ->latest()
            ->first();

        if (!$payment) {
            return response()->json([
                'has_payment' => false,
                'requires_payment' => $activity->requiresPayment(),
                'price' => $activity->price,
                'currency' => $activity->currency,
            ]);
        }

        return response()->json([
            'has_payment' => true,
            'payment' => $payment,
            'is_paid' => $payment->isCompleted(),
        ]);
    }

    /**
     * Obtener instrucciones de pago según el método
     */
    private function getPaymentInstructions(string $paymentMethod, Activity $activity): array
    {
        $instructions = [
            'cash' => [
                'title' => 'Pago en Efectivo',
                'steps' => [
                    'Acércate a las oficinas de la Facultad de Ingeniería en Sistemas',
                    'Menciona el código de actividad: ' . $activity->id,
                    'Realiza el pago de ' . $activity->getFormattedPrice(),
                    'Solicita tu recibo de pago',
                ],
                'note' => 'Horario de atención: Lunes a Viernes, 8:00 AM - 5:00 PM'
            ],
            'bank_transfer' => [
                'title' => 'Transferencia Bancaria',
                'steps' => [
                    'Realiza una transferencia a la siguiente cuenta:',
                    'Banco: Banco Industrial',
                    'No. de Cuenta: 123-456789-0',
                    'A nombre de: Universidad Mariano Gálvez',
                    'Monto: ' . $activity->getFormattedPrice(),
                    'Concepto: Actividad ' . $activity->id . ' - ' . $activity->name,
                    'Sube tu comprobante de pago',
                ],
                'note' => 'Tu inscripción será confirmada una vez verifiquemos tu pago.'
            ],
            'card' => [
                'title' => 'Tarjeta de Crédito/Débito',
                'steps' => [
                    'Serás redirigido a la pasarela de pago segura',
                    'Ingresa los datos de tu tarjeta',
                    'Confirma el pago de ' . $activity->getFormattedPrice(),
                ],
                'note' => 'Aceptamos Visa, Mastercard y American Express'
            ],
            'visanet' => [
                'title' => 'Pago con VisaNet',
                'steps' => [
                    'Serás redirigido a VisaNet',
                    'Ingresa tu número de tarjeta Visa',
                    'Confirma el pago de ' . $activity->getFormattedPrice(),
                ],
                'note' => 'Sistema de pago seguro de Visa'
            ],
        ];

        return $instructions[$paymentMethod] ?? [];
    }
}
