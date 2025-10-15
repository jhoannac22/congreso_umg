<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Winner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WinnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Winner::with(['participant', 'activity']);

        // Filtrar por año
        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

        // Filtrar por actividad
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filtrar por posición
        if ($request->has('position')) {
            $query->where('position', $request->position);
        }

        // Filtrar por estado de publicación
        if ($request->has('published')) {
            $query->where('is_published', $request->boolean('published'));
        }

        // Ordenar por año, actividad y posición
        $query->orderBy('year', 'desc')
              ->orderBy('activity_id')
              ->orderBy('position');

        $winners = $query->paginate(15);

        return response()->json([
            'message' => 'Ganadores obtenidos exitosamente',
            'data' => $winners,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'activity_id' => 'required|exists:activities,id',
            'participant_id' => 'required|exists:participants,id',
            'position' => 'required|integer|min:1|max:10',
            'project_name' => 'nullable|string|max:255',
            'project_description' => 'nullable|string|max:2000',
            'project_image' => 'nullable|string|max:500',
            'judges_notes' => 'nullable|string|max:1000',
            'score' => 'nullable|numeric|min:0|max:100',
            'year' => 'required|integer|min:2020|max:' . (date('Y') + 1),
            'is_published' => 'sometimes|boolean',
        ]);

        // Verificar que no exista ya un ganador en la misma posición para la misma actividad y año
        $existingWinner = Winner::where('activity_id', $request->activity_id)
            ->where('position', $request->position)
            ->where('year', $request->year)
            ->first();

        if ($existingWinner) {
            return response()->json([
                'message' => 'Ya existe un ganador en la posición ' . $request->position . ' para esta actividad en el año ' . $request->year,
            ], 422);
        }

        $winner = Winner::create($request->all());
        $winner->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Ganador registrado exitosamente',
            'data' => $winner,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Winner $winner): JsonResponse
    {
        $winner->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Ganador obtenido exitosamente',
            'data' => $winner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Winner $winner): JsonResponse
    {
        $request->validate([
            'position' => 'sometimes|required|integer|min:1|max:10',
            'project_name' => 'sometimes|nullable|string|max:255',
            'project_description' => 'sometimes|nullable|string|max:2000',
            'project_image' => 'sometimes|nullable|string|max:500',
            'judges_notes' => 'sometimes|nullable|string|max:1000',
            'score' => 'sometimes|nullable|numeric|min:0|max:100',
            'is_published' => 'sometimes|boolean',
        ]);

        $winner->update($request->all());
        $winner->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Ganador actualizado exitosamente',
            'data' => $winner,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Winner $winner): JsonResponse
    {
        $winner->delete();

        return response()->json([
            'message' => 'Ganador eliminado exitosamente',
        ]);
    }

    /**
     * Obtener ganadores por año
     */
    public function byYear(int $year): JsonResponse
    {
        $winners = Winner::with(['participant', 'activity'])
            ->where('year', $year)
            ->where('is_published', true)
            ->orderBy('activity_id')
            ->orderBy('position')
            ->get();

        // Agrupar por actividad
        $winnersByActivity = $winners->groupBy('activity_id');

        return response()->json([
            'message' => "Ganadores del año {$year} obtenidos exitosamente",
            'data' => [
                'year' => $year,
                'winners' => $winners,
                'by_activity' => $winnersByActivity,
            ],
        ]);
    }

    /**
     * Obtener ganadores por actividad
     */
    public function byActivity(Activity $activity): JsonResponse
    {
        $winners = Winner::with(['participant'])
            ->where('activity_id', $activity->id)
            ->where('is_published', true)
            ->orderBy('year', 'desc')
            ->orderBy('position')
            ->get();

        // Agrupar por año
        $winnersByYear = $winners->groupBy('year');

        return response()->json([
            'message' => "Ganadores de la actividad '{$activity->name}' obtenidos exitosamente",
            'data' => [
                'activity' => $activity,
                'winners' => $winners,
                'by_year' => $winnersByYear,
            ],
        ]);
    }

    /**
     * Publicar ganador
     */
    public function publish(Winner $winner): JsonResponse
    {
        $winner->update(['is_published' => true]);

        return response()->json([
            'message' => 'Ganador publicado exitosamente',
            'data' => $winner,
        ]);
    }

    /**
     * Despublicar ganador
     */
    public function unpublish(Winner $winner): JsonResponse
    {
        $winner->update(['is_published' => false]);

        return response()->json([
            'message' => 'Ganador despublicado exitosamente',
            'data' => $winner,
        ]);
    }

    /**
     * Obtener podio de una actividad (primeros 3 lugares)
     */
    public function podium(Activity $activity, int $year): JsonResponse
    {
        $podium = Winner::with(['participant'])
            ->where('activity_id', $activity->id)
            ->where('year', $year)
            ->where('is_published', true)
            ->whereIn('position', [1, 2, 3])
            ->orderBy('position')
            ->get();

        return response()->json([
            'message' => "Podio de la actividad '{$activity->name}' del año {$year} obtenido exitosamente",
            'data' => [
                'activity' => $activity,
                'year' => $year,
                'podium' => $podium,
            ],
        ]);
    }

    /**
     * Obtener años disponibles con ganadores
     */
    public function availableYears(): JsonResponse
    {
        $years = Winner::select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        return response()->json([
            'message' => 'Años disponibles obtenidos exitosamente',
            'data' => $years,
        ]);
    }
}
