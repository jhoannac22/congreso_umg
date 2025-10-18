<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Attendance;
use App\Models\Diploma;
use App\Models\Participant;
use App\Models\Winner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Obtener estadísticas generales del dashboard
     */
    public function getStats(): JsonResponse
    {
        try {
            // Métricas principales
            $stats = [
                // Participantes
                'participants' => [
                    'total' => Participant::count(),
                    'internal' => Participant::where('type', 'interno')->count(),
                    'external' => Participant::where('type', 'externo')->count(),
                    'verified' => Participant::where('email_verified', true)->count(),
                ],
                
                // Asistencia
                'attendance' => [
                    'total' => Attendance::count(),
                    'today' => Attendance::whereDate('check_in_time', today())->count(),
                    'general' => Attendance::where('type', 'general')->count(),
                    'activities' => Attendance::where('type', 'activity')->count(),
                ],
                
                // Actividades
                'activities' => [
                    'total' => Activity::where('is_active', true)->count(),
                    'workshops' => Activity::where('type', 'taller')->where('is_active', true)->count(),
                    'competitions' => Activity::where('type', 'competencia')->where('is_active', true)->count(),
                    'upcoming' => Activity::where('start_date', '>', now())->count(),
                ],
                
                // Diplomas
                'diplomas' => [
                    'total' => Diploma::count(),
                    'sent' => Diploma::where('is_sent', true)->count(),
                    'pending' => Diploma::where('is_sent', false)->count(),
                ],
                
                // Ganadores
                'winners' => [
                    'total' => Winner::count(),
                    'published' => Winner::where('is_published', true)->count(),
                    'draft' => Winner::where('is_published', false)->count(),
                    'current_year' => Winner::where('year', date('Y'))->count(),
                ],
                
                // Top actividades por inscripciones
                'top_activities' => Activity::withCount('participants')
                    ->where('is_active', true)
                    ->orderBy('participants_count', 'desc')
                    ->limit(5)
                    ->get()
                    ->map(function ($activity) {
                        return [
                            'id' => $activity->id,
                            'name' => $activity->name,
                            'type' => $activity->type,
                            'participants' => $activity->participants_count,
                            'max_capacity' => $activity->max_participants ?? 0,
                            'percentage' => $activity->max_participants > 0 
                                ? round(($activity->participants_count / $activity->max_participants) * 100, 1)
                                : 0,
                        ];
                    }),
                
                // Alertas/Pendientes
                'alerts' => [
                    'diplomas_pending' => Diploma::where('is_sent', false)->count(),
                    'winners_draft' => Winner::where('is_published', false)->count(),
                    'activities_full' => Activity::whereRaw('current_participants >= max_participants')
                        ->where('max_participants', '>', 0)
                        ->count(),
                ],
                
                // Actividad reciente
                'recent_activity' => [
                    'registrations' => Participant::orderBy('created_at', 'desc')->limit(5)->get()->map(function($p) {
                        return [
                            'type' => 'registration',
                            'message' => "{$p->first_name} {$p->last_name} se registró",
                            'time' => $p->created_at->diffForHumans(),
                        ];
                    }),
                    'attendance' => Attendance::with('participant')->orderBy('check_in_time', 'desc')->limit(5)->get()->map(function($a) {
                        return [
                            'type' => 'attendance',
                            'message' => "{$a->participant->first_name} {$a->participant->last_name} registró asistencia",
                            'time' => $a->check_in_time->diffForHumans(),
                        ];
                    }),
                ],
            ];
            
            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas: ' . $e->getMessage(),
            ], 500);
        }
    }
}

