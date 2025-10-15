<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Faq::query();

        // Filtrar por estado activo si se especifica
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        } else {
            // Por defecto, solo mostrar FAQs activas
            $query->where('is_active', true);
        }

        // Filtrar por categoría
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Ordenar por orden y luego por ID
        $query->orderBy('order')->orderBy('id');

        $faqs = $query->get();

        // Agrupar por categoría si se solicita
        if ($request->boolean('group_by_category')) {
            $faqs = $faqs->groupBy('category');
        }

        return response()->json([
            'message' => 'FAQs obtenidas exitosamente',
            'data' => $faqs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'question' => 'required|string|max:500',
            'answer' => 'required|string|max:2000',
            'category' => 'required|string|in:general,inscripcion,actividades,diplomas',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $faq = Faq::create([
            'question' => $request->question,
            'answer' => $request->answer,
            'category' => $request->category,
            'order' => $request->order ?? 0,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return response()->json([
            'message' => 'FAQ creada exitosamente',
            'data' => $faq,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq): JsonResponse
    {
        return response()->json([
            'message' => 'FAQ obtenida exitosamente',
            'data' => $faq,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faq $faq): JsonResponse
    {
        $request->validate([
            'question' => 'sometimes|required|string|max:500',
            'answer' => 'sometimes|required|string|max:2000',
            'category' => 'sometimes|required|string|in:general,inscripcion,actividades,diplomas',
            'order' => 'sometimes|nullable|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $faq->update($request->only([
            'question', 'answer', 'category', 'order', 'is_active'
        ]));

        return response()->json([
            'message' => 'FAQ actualizada exitosamente',
            'data' => $faq,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq): JsonResponse
    {
        $faq->delete();

        return response()->json([
            'message' => 'FAQ eliminada exitosamente',
        ]);
    }

    /**
     * Activar/desactivar FAQ
     */
    public function toggleStatus(Faq $faq): JsonResponse
    {
        $faq->update(['is_active' => !$faq->is_active]);

        return response()->json([
            'message' => 'Estado de FAQ actualizado exitosamente',
            'data' => $faq,
        ]);
    }

    /**
     * Obtener FAQs por categoría
     */
    public function byCategory(string $category): JsonResponse
    {
        $faqs = Faq::where('category', $category)
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json([
            'message' => "FAQs de la categoría '{$category}' obtenidas exitosamente",
            'data' => $faqs,
        ]);
    }

    /**
     * Buscar FAQs
     */
    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $query = $request->q;
        
        $faqs = Faq::where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->where('question', 'like', "%{$query}%")
                  ->orWhere('answer', 'like', "%{$query}%");
            })
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json([
            'message' => 'Búsqueda de FAQs completada exitosamente',
            'data' => $faqs,
            'search_query' => $query,
        ]);
    }

    /**
     * Obtener categorías disponibles
     */
    public function categories(): JsonResponse
    {
        $categories = Faq::where('is_active', true)
            ->select('category')
            ->distinct()
            ->pluck('category');

        $categoryNames = [
            'general' => 'General',
            'inscripcion' => 'Inscripción',
            'actividades' => 'Actividades',
            'diplomas' => 'Diplomas',
        ];

        $categoriesWithNames = $categories->map(function ($category) use ($categoryNames) {
            return [
                'key' => $category,
                'name' => $categoryNames[$category] ?? ucfirst($category),
            ];
        });

        return response()->json([
            'message' => 'Categorías de FAQs obtenidas exitosamente',
            'data' => $categoriesWithNames,
        ]);
    }
}
