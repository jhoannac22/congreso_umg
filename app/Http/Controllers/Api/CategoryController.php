<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Category::query();

        // Filtrar por estado activo si se especifica
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Ordenar por nombre
        $query->orderBy('name');

        $categories = $query->get();

        return response()->json([
            'message' => 'Categorías obtenidas exitosamente',
            'data' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());

        return response()->json([
            'message' => 'Categoría creada exitosamente',
            'data' => $category,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): JsonResponse
    {
        $category->load('activities');

        return response()->json([
            'message' => 'Categoría obtenida exitosamente',
            'data' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, Category $category): JsonResponse
    {
        $category->update($request->validated());

        return response()->json([
            'message' => 'Categoría actualizada exitosamente',
            'data' => $category,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        // Verificar si la categoría tiene actividades asociadas
        if ($category->activities()->count() > 0) {
            return response()->json([
                'message' => 'No se puede eliminar la categoría porque tiene actividades asociadas',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada exitosamente',
        ]);
    }

    /**
     * Activar/desactivar categoría
     */
    public function toggleStatus(Category $category): JsonResponse
    {
        $category->update(['is_active' => !$category->is_active]);

        return response()->json([
            'message' => 'Estado de categoría actualizado exitosamente',
            'data' => $category,
        ]);
    }
}
