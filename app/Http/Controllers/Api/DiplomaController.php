<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Diploma;
use App\Models\Participant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
        if (!$diploma->pdf_path || !Storage::exists($diploma->pdf_path)) {
            return response()->json([
                'message' => 'El archivo del diploma no existe',
            ], 404);
        }

        $diploma->load(['participant', 'activity']);
        $filename = "diploma_{$diploma->participant->first_name}_{$diploma->participant->last_name}_{$diploma->activity->name}.pdf";

        return Storage::download($diploma->pdf_path, $filename);
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

        // Crear contenido HTML del diploma
        $html = $this->generateDiplomaHtml($diploma);

        // Por ahora, guardamos el HTML como placeholder
        // En una implementación real, usarías una librería como DomPDF o TCPDF
        $filename = 'diplomas/' . $diploma->diploma_number . '.html';
        Storage::put($filename, $html);

        return $filename;
    }

    /**
     * Generar HTML del diploma
     */
    private function generateDiplomaHtml(Diploma $diploma): string
    {
        $participant = $diploma->participant;
        $activity = $diploma->activity;

        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Diploma - {$activity->name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 40px; }
                .diploma { border: 3px solid #3B82F6; padding: 60px; text-align: center; }
                .title { font-size: 36px; color: #3B82F6; margin-bottom: 30px; }
                .subtitle { font-size: 24px; color: #666; margin-bottom: 40px; }
                .participant-name { font-size: 32px; font-weight: bold; color: #1F2937; margin: 30px 0; }
                .activity-name { font-size: 20px; color: #4B5563; margin: 20px 0; }
                .date { font-size: 16px; color: #6B7280; margin-top: 40px; }
                .signature { margin-top: 60px; }
            </style>
        </head>
        <body>
            <div class='diploma'>
                <div class='title'>DIPLOMA DE PARTICIPACIÓN</div>
                <div class='subtitle'>Congreso de Tecnología UMG</div>
                
                <div class='participant-name'>{$participant->first_name} {$participant->last_name}</div>
                
                <div>Por haber participado exitosamente en</div>
                <div class='activity-name'>{$activity->name}</div>
                
                <div class='date'>Emitido el {$diploma->issue_date->format('d/m/Y')}</div>
                
                <div class='signature'>
                    <div>_________________________</div>
                    <div>Coordinador General</div>
                </div>
            </div>
        </body>
        </html>";
    }
}
