<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Attendance;
use App\Models\Activity;
use App\Models\Participant;

class AttendanceReportController extends Controller
{
    /**
     * Get attendance statistics
     */
    public function getStats(Request $request): JsonResponse
    {
        $query = Attendance::query();

        // Filter by activity if provided
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('check_in_time', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('check_in_time', '<=', $request->date_to);
        }

        $totalAttendances = $query->count();
        $uniqueParticipants = $query->distinct('participant_id')->count('participant_id');
        $avgCheckInTime = $query->avg('check_in_time');

        return response()->json([
            'success' => true,
            'data' => [
                'total_attendances' => $totalAttendances,
                'unique_participants' => $uniqueParticipants,
                'avg_check_in_time' => $avgCheckInTime,
            ],
        ]);
    }

    /**
     * Get attendance reports
     */
    public function getReports(Request $request): JsonResponse
    {
        $query = Attendance::with(['activity', 'participant']);

        // Filter by activity
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filter by participant
        if ($request->has('participant_id')) {
            $query->where('participant_id', $request->participant_id);
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('check_in_time', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('check_in_time', '<=', $request->date_to);
        }

        // Order by check in time
        $query->orderBy('check_in_time', 'desc');

        // Paginate results
        $perPage = $request->get('per_page', 15);
        $attendances = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $attendances,
        ]);
    }

    /**
     * Generate detailed report for activity
     */
    public function generateActivityReport($activityId): JsonResponse
    {
        $activity = Activity::with(['attendances.participant'])->findOrFail($activityId);

        $stats = [
            'total_registered' => $activity->current_participants,
            'total_attended' => $activity->attendances()->count(),
            'attendance_rate' => $activity->current_participants > 0 
                ? ($activity->attendances()->count() / $activity->current_participants) * 100 
                : 0,
            'attendances' => $activity->attendances()->with('participant')->get(),
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'activity' => $activity,
                'statistics' => $stats,
            ],
        ]);
    }
}

