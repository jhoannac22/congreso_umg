<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\ActivityRegistrationController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\AttendanceReportController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DiplomaController;
use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\QrCodeController;
use App\Http\Controllers\Api\WinnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas públicas (sin autenticación)
Route::prefix('v1')->group(function () {
    // Autenticación
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    // Verificación de email
    Route::post('/verify-email', [EmailController::class, 'verifyEmail']);
    
    // FAQs públicas
    Route::get('/faqs', [FaqController::class, 'index']);
    Route::get('/faqs/{faq}', [FaqController::class, 'show']);
    
    // Categorías públicas (solo activas)
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    
    // Actividades públicas (solo activas)
    Route::get('/activities', [ActivityController::class, 'index']);
    Route::get('/activities/{activity}', [ActivityController::class, 'show']);
    
    // Dashboard público (información básica de participantes)
    Route::get('/dashboard/participants', [ParticipantController::class, 'dashboard']);
    
    // Inscripción a actividades (público)
    Route::post('/activities/{activity}/register', [ActivityController::class, 'register']);
    Route::post('/activities/{activity}/check-registration', [ActivityRegistrationController::class, 'checkRegistration']);
    Route::get('/my-activities', [ActivityRegistrationController::class, 'myActivities']);
    
    // Pagos (público - permite a participantes crear y consultar pagos)
    Route::post('/activities/{activity}/payments', [PaymentController::class, 'create']);
    Route::post('/payments/{payment}/upload-proof', [PaymentController::class, 'uploadProof']);
    Route::get('/activities/{activity}/check-payment', [PaymentController::class, 'checkPaymentStatus']);
    Route::get('/my-payments', [PaymentController::class, 'myPayments']);
    
    
    // Reportes de asistencia (público - para visualización básica)
    Route::get('/attendance/stats', [AttendanceReportController::class, 'getStats']);
    Route::get('/attendance/reports', [AttendanceReportController::class, 'getReports']);
    
    // Registro de asistencia por QR (email)
    Route::post('/attendance/check-in-email', [AttendanceController::class, 'checkInByEmail']);
    
    // Validación de código QR del congreso
    Route::post('/attendance/validate-qr', [AttendanceController::class, 'validateQrCode']);
});

// Rutas protegidas (requieren autenticación)
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Información del usuario autenticado
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    
    // Cancelar inscripción a actividad
    Route::post('/activities/{activity}/cancel', [ActivityRegistrationController::class, 'cancel']);
    
    // Gestión de emails
    Route::post('/resend-verification', [EmailController::class, 'resendVerification']);
    Route::post('/send-registration-confirmation', [EmailController::class, 'sendRegistrationConfirmation']);
    Route::post('/send-event-reminder', [EmailController::class, 'sendEventReminder']);
    
    // Gestión de participantes
    Route::apiResource('participants', ParticipantController::class);
    Route::get('/participants/by-email/{email}', [ParticipantController::class, 'showByEmail']);
    Route::post('/participants/{participant}/register-activity', [ParticipantController::class, 'registerActivity']);
    Route::delete('/participants/{participant}/unregister-activity/{activity}', [ParticipantController::class, 'unregisterActivity']);
    
    // Gestión de asistencias (administrativo)
    Route::apiResource('attendances', AttendanceController::class);
    Route::post('/attendances/check-out', [AttendanceController::class, 'checkOut']);
    Route::get('/attendances/report', [AttendanceController::class, 'report']);
    
    
    // Gestión de QR codes
    Route::prefix('qr-codes')->group(function () {
        Route::get('/{id}', [QrCodeController::class, 'show']);
        Route::post('/generate/registration', [QrCodeController::class, 'generateForRegistration']);
        Route::post('/generate/activity', [QrCodeController::class, 'generateForActivity']);
        Route::post('/regenerate', [QrCodeController::class, 'regenerate']);
        Route::post('/cleanup-expired', [QrCodeController::class, 'cleanupExpired']);
        Route::get('/participant/{participant_id}', [QrCodeController::class, 'getParticipantQrCodes']);
        Route::get('/activity/{activity_id}/stats', [QrCodeController::class, 'getActivityStats']);
    });
    
    
    // Gestión de diplomas
    Route::apiResource('diplomas', DiplomaController::class);
    Route::post('/diplomas/generate/{participant}/{activity}', [DiplomaController::class, 'generate']);
    Route::get('/diplomas/download/{diploma}', [DiplomaController::class, 'download']);
    
    // Gestión de ganadores
    Route::apiResource('winners', WinnerController::class);
    Route::get('/winners/by-year/{year}', [WinnerController::class, 'byYear']);
    Route::get('/winners/by-activity/{activity}', [WinnerController::class, 'byActivity']);
});

// Rutas de administración (requieren rol admin u organizer)
Route::prefix('v1/admin')->middleware(['auth:sanctum', 'role:admin,organizer'])->group(function () {
    // Gestión completa de categorías
    Route::apiResource('categories', CategoryController::class);
    Route::patch('/categories/{category}/toggle-status', [CategoryController::class, 'toggleStatus']);
    
    // Gestión completa de actividades
    Route::apiResource('activities', ActivityController::class);
    Route::patch('/activities/{activity}/toggle-status', [ActivityController::class, 'toggleStatus']);
    Route::get('/activities/{activity}/participants', [ActivityController::class, 'participants']);
    Route::patch('/activities/{activity}/participants/{participant}/approve', [ActivityController::class, 'approveParticipant']);
    Route::patch('/activities/{activity}/participants/{participant}/reject', [ActivityController::class, 'rejectParticipant']);
    
    // Gestión de emails masivos
    Route::post('/send-bulk-event-reminders', [EmailController::class, 'sendBulkEventReminders']);
    
    // Gestión de FAQs
    Route::apiResource('faqs', FaqController::class);
    Route::patch('/faqs/{faq}/toggle-status', [FaqController::class, 'toggleStatus']);
    
    // Reportes
    Route::get('/reports/attendance', [AttendanceController::class, 'report']);
    Route::get('/reports/activities', [ActivityController::class, 'report']);
    Route::get('/reports/participants', [ParticipantController::class, 'report']);
    
    // Gestión de pagos (admin)
    Route::post('/payments/{payment}/confirm', [PaymentController::class, 'confirm']);
    Route::post('/payments/{payment}/reject', [PaymentController::class, 'reject']);
});

// Rutas de juez (requieren rol judge)
Route::prefix('v1/judge')->middleware(['auth:sanctum', 'role:judge'])->group(function () {
    // Gestión de ganadores
    Route::apiResource('winners', WinnerController::class);
    Route::post('/winners/publish/{winner}', [WinnerController::class, 'publish']);
    Route::post('/winners/unpublish/{winner}', [WinnerController::class, 'unpublish']);
});
