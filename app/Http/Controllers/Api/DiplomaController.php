<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Diploma;
use App\Models\Participant;
use App\Models\Winner;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DiplomaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Diploma::with(['participant', 'activity']);

        // Filtrar por participante
        if ($request->has('participant_id')) {
            $query->where('participant_id', $request->participant_id);
        }

        // Filtrar por actividad
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filtrar por tipo de plantilla
        if ($request->has('template_type')) {
            $query->where('template_type', $request->template_type);
        }

        // Filtrar por estado de envío
        if ($request->has('sent')) {
            $query->where('is_sent', $request->boolean('sent'));
        }

        // Filtrar por rango de fechas
        if ($request->has('date_from')) {
            $query->whereDate('issue_date', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('issue_date', '<=', $request->date_to);
        }

        // Ordenar por fecha de emisión
        $query->orderBy('issue_date', 'desc');

        $diplomas = $query->paginate(15);

        return response()->json([
            'message' => 'Diplomas obtenidos exitosamente',
            'data' => $diplomas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
            'activity_id' => 'required|exists:activities,id',
            'template_type' => 'required|in:participation,winner,special',
            'issue_date' => 'required|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Verificar si ya existe un diploma para este participante y actividad
        $existingDiploma = Diploma::where('participant_id', $request->participant_id)
            ->where('activity_id', $request->activity_id)
            ->first();

        if ($existingDiploma) {
            return response()->json([
                'message' => 'Ya existe un diploma para este participante en esta actividad',
            ], 422);
        }

        $diploma = Diploma::create([
            'participant_id' => $request->participant_id,
            'activity_id' => $request->activity_id,
            'diploma_number' => $this->generateDiplomaNumber(),
            'template_type' => $request->template_type,
            'pdf_path' => '', // Se generará después
            'issue_date' => $request->issue_date,
            'notes' => $request->notes,
        ]);

        // Generar el PDF del diploma
        $pdfPath = $this->generateDiplomaPdf($diploma);
        $diploma->update(['pdf_path' => $pdfPath]);

        $diploma->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Diploma creado exitosamente',
            'data' => $diploma,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Diploma $diploma): JsonResponse
    {
        $diploma->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Diploma obtenido exitosamente',
            'data' => $diploma,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Diploma $diploma): JsonResponse
    {
        $request->validate([
            'template_type' => 'sometimes|required|in:participation,winner,special',
            'issue_date' => 'sometimes|required|date',
            'notes' => 'sometimes|nullable|string|max:1000',
        ]);

        $diploma->update($request->only(['template_type', 'issue_date', 'notes']));

        // Regenerar PDF si cambió el tipo de plantilla
        if ($request->has('template_type')) {
            $pdfPath = $this->generateDiplomaPdf($diploma);
            $diploma->update(['pdf_path' => $pdfPath]);
        }

        return response()->json([
            'message' => 'Diploma actualizado exitosamente',
            'data' => $diploma,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diploma $diploma): JsonResponse
    {
        // Eliminar el archivo PDF si existe
        if ($diploma->pdf_path && Storage::exists($diploma->pdf_path)) {
            Storage::delete($diploma->pdf_path);
        }

        $diploma->delete();

        return response()->json([
            'message' => 'Diploma eliminado exitosamente',
        ]);
    }

    /**
     * Generar diploma para un participante y actividad
     */
    public function generate(Participant $participant, Activity $activity): JsonResponse
    {
        // Verificar si ya existe un diploma
        $existingDiploma = Diploma::where('participant_id', $participant->id)
            ->where('activity_id', $activity->id)
            ->first();

        if ($existingDiploma) {
            return response()->json([
                'message' => 'Ya existe un diploma para este participante en esta actividad',
                'data' => $existingDiploma,
            ], 422);
        }

        // Crear el diploma
        $diploma = Diploma::create([
            'participant_id' => $participant->id,
            'activity_id' => $activity->id,
            'diploma_number' => $this->generateDiplomaNumber(),
            'template_type' => 'participation',
            'pdf_path' => '',
            'issue_date' => now()->toDateString(),
        ]);

        // Generar el PDF
        $pdfPath = $this->generateDiplomaPdf($diploma);
        $diploma->update(['pdf_path' => $pdfPath]);

        $diploma->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Diploma generado exitosamente',
            'data' => $diploma,
        ], 201);
    }

    /**
     * Descargar diploma
     */
    public function download(Diploma $diploma)
    {
        if (!$diploma->pdf_path || !Storage::disk('public')->exists($diploma->pdf_path)) {
            return response()->json([
                'message' => 'El archivo del diploma no existe',
            ], 404);
        }

        $diploma->load(['participant', 'activity']);
        $filename = "diploma_{$diploma->participant->first_name}_{$diploma->participant->last_name}_{$diploma->activity->name}.pdf";

        return response()->download(
            storage_path('app/public/' . $diploma->pdf_path),
            $filename,
            ['Content-Type' => 'application/pdf']
        );
    }

    /**
     * Marcar diploma como enviado
     */
    public function markAsSent(Diploma $diploma): JsonResponse
    {
        $diploma->update([
            'is_sent' => true,
            'sent_at' => now(),
        ]);

        return response()->json([
            'message' => 'Diploma marcado como enviado exitosamente',
            'data' => $diploma,
        ]);
    }
    
    /**
     * Enviar diploma por email
     */
    public function sendByEmail(Diploma $diploma): JsonResponse
    {
        try {
            $diploma->load(['participant', 'activity']);
            
            // Verificar que el PDF exista
            if (!$diploma->pdf_path || !Storage::disk('public')->exists($diploma->pdf_path)) {
                return response()->json([
                    'message' => 'El diploma aún no ha sido generado',
                ], 404);
            }
            
            // Enviar email con el diploma adjunto
            Mail::to($diploma->participant->email)->send(
                new \App\Mail\DiplomaReady($diploma)
            );
            
            // Marcar como enviado
            $diploma->update([
                'is_sent' => true,
                'sent_at' => now(),
            ]);
            
            return response()->json([
                'message' => 'Diploma enviado exitosamente al correo ' . $diploma->participant->email,
                'data' => $diploma,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al enviar el diploma: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Generar diplomas masivamente para una actividad
     */
    public function generateBulkForActivity(Request $request, Activity $activity): JsonResponse
    {
        $request->validate([
            'template_type' => 'sometimes|in:participation,winner,special',
            'issue_date' => 'sometimes|date',
        ]);
        
        $activity->load('participants');
        $templateType = $request->input('template_type', 'participation');
        $issueDate = $request->input('issue_date', now()->toDateString());
        
        $generated = 0;
        $skipped = 0;
        $errors = [];
        
        foreach ($activity->participants as $participant) {
            try {
                // Verificar si ya existe un diploma
                $existing = Diploma::where('participant_id', $participant->id)
                    ->where('activity_id', $activity->id)
                    ->first();
                    
                if ($existing) {
                    $skipped++;
                    continue;
                }
                
                // Crear el diploma
                $diploma = Diploma::create([
                    'participant_id' => $participant->id,
                    'activity_id' => $activity->id,
                    'diploma_number' => $this->generateDiplomaNumber(),
                    'template_type' => $templateType,
                    'pdf_path' => '',
                    'issue_date' => $issueDate,
                ]);
                
                // Generar el PDF
                $pdfPath = $this->generateDiplomaPdf($diploma);
                $diploma->update(['pdf_path' => $pdfPath]);
                
                $generated++;
            } catch (\Exception $e) {
                $errors[] = "Error con participante {$participant->id}: " . $e->getMessage();
            }
        }
        
        return response()->json([
            'message' => "Generación masiva completada",
            'data' => [
                'generated' => $generated,
                'skipped' => $skipped,
                'errors' => $errors,
                'total_participants' => $activity->participants->count(),
            ],
        ]);
    }
    
    /**
     * Obtener diplomas de un participante
     */
    public function getParticipantDiplomas(Participant $participant): JsonResponse
    {
        $diplomas = Diploma::where('participant_id', $participant->id)
            ->with('activity')
            ->orderBy('issue_date', 'desc')
            ->get();
            
        return response()->json([
            'message' => 'Diplomas del participante obtenidos exitosamente',
            'data' => $diplomas,
        ]);
    }

    /**
     * Generar número único de diploma
     */
    private function generateDiplomaNumber(): string
    {
        do {
            $number = 'DIP-' . date('Y') . '-' . Str::random(8);
        } while (Diploma::where('diploma_number', $number)->exists());

        return $number;
    }

    /**
     * Generar PDF del diploma
     */
    private function generateDiplomaPdf(Diploma $diploma): string
    {
        $diploma->load(['participant', 'activity']);
        
        // Preparar datos para la vista
        $data = $this->prepareDiplomaData($diploma);
        
        // Seleccionar la vista según el tipo de plantilla
        $viewName = match($diploma->template_type) {
            'winner' => 'diplomas.winner',
            'special' => 'diplomas.special',
            default => 'diplomas.participation'
        };
        
        // Generar PDF usando DomPDF
        $pdf = Pdf::loadView($viewName, $data);
        
        // Configurar el PDF
        $pdf->setPaper('A4', 'landscape');
        
        // Definir nombre de archivo
        $filename = 'diplomas/' . $diploma->diploma_number . '.pdf';
        
        // Guardar el PDF en el disco público
        Storage::disk('public')->put($filename, $pdf->output());
        
        return $filename;
    }
    
    /**
     * Preparar datos para el diploma según su tipo
     */
    private function prepareDiplomaData(Diploma $diploma): array
    {
        $data = [
            'diploma' => $diploma,
            'participant' => $diploma->participant,
            'activity' => $diploma->activity,
        ];
        
        // Si es un diploma de ganador, buscar información del ganador
        if ($diploma->template_type === 'winner') {
            $winner = Winner::where('participant_id', $diploma->participant_id)
                ->where('activity_id', $diploma->activity_id)
                ->first();
                
            if ($winner) {
                $data['position'] = $winner->position;
                $data['projectName'] = $winner->project_name;
                $data['score'] = $winner->score;
            }
        }
        
        // Si es un diploma especial, incluir notas
        if ($diploma->template_type === 'special' && $diploma->notes) {
            $data['notes'] = $diploma->notes;
            $data['specialTitle'] = 'Reconocimiento Especial';
        }
        
        return $data;
    }
    
    /**
     * Obtener estadísticas de diplomas
     */
    public function getStats(): JsonResponse
    {
        try {
            $stats = [
                'total' => Diploma::count(),
                'sent' => Diploma::where('is_sent', true)->count(),
                'pending' => Diploma::where('is_sent', false)->count(),
                'by_type' => [
                    'participation' => Diploma::where('template_type', 'participation')->count(),
                    'winner' => Diploma::where('template_type', 'winner')->count(),
                    'special' => Diploma::where('template_type', 'special')->count(),
                ],
                'recent' => Diploma::with(['participant', 'activity'])
                    ->orderBy('created_at', 'desc')
                    ->limit(5)
                    ->get(),
            ];
            
            return response()->json([
                'message' => 'Estadísticas obtenidas exitosamente',
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting diploma stats', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'message' => 'Error al obtener estadísticas',
            ], 500);
        }
    }
    
    /**
     * Enviar diplomas masivamente por email
     */
    public function sendBulkEmails(Request $request): JsonResponse
    {
        $request->validate([
            'diploma_ids' => 'required|array',
            'diploma_ids.*' => 'exists:diplomas,id'
        ]);
        
        try {
            $sent = 0;
            $errors = [];
            
            foreach ($request->diploma_ids as $diplomaId) {
                try {
                    $diploma = Diploma::with(['participant', 'activity'])->find($diplomaId);
                    
                    // Verificar que el PDF existe
                    if (!$diploma->pdf_path || !Storage::disk('public')->exists($diploma->pdf_path)) {
                        $errors[] = "Diploma {$diploma->diploma_number}: PDF no generado";
                        continue;
                    }
                    
                    // Enviar email
                    Mail::to($diploma->participant->email)->send(
                        new \App\Mail\DiplomaReady($diploma)
                    );
                    
                    // Marcar como enviado
                    $diploma->update([
                        'is_sent' => true,
                        'sent_at' => now(),
                    ]);
                    
                    $sent++;
                } catch (\Exception $e) {
                    $errors[] = "Diploma {$diplomaId}: " . $e->getMessage();
                }
            }
            
            return response()->json([
                'message' => 'Envío masivo completado',
                'data' => [
                    'sent' => $sent,
                    'errors' => $errors,
                    'total' => count($request->diploma_ids),
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error in bulk email sending', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'message' => 'Error al enviar emails masivos',
            ], 500);
        }
    }
}
