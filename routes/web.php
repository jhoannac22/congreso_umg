<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $activities = \App\Models\Activity::with('category')
        ->where('is_active', true)
        ->orderBy('start_date')
        ->limit(6)
        ->get();
    
    return Inertia::render('Home', [
        'activities' => $activities
    ]);
})->name('home');

Route::get('/activities', function () {
    return Inertia::render('Activities');
})->name('activities');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::get('/faq', function () {
    return Inertia::render('Faq');
})->name('faq');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/confirmation', function () {
    return Inertia::render('Confirmation');
})->name('confirmation');

Route::get('/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->name('dashboard');

Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->name('admin.dashboard');

Route::get('/verify-email', function () {
    return Inertia::render('EmailVerification');
})->name('verify-email');

Route::get('/participant-qr', function () {
    return Inertia::render('ParticipantQR');
})->name('participant-qr');

Route::get('/my-activities', function () {
    return Inertia::render('MyActivities');
})->name('my-activities');

Route::get('/participant-dashboard', function () {
    return Inertia::render('ParticipantDashboard');
})->name('participant-dashboard');

Route::get('/qr-scanner', function () {
    return Inertia::render('AttendanceScanner');
})->name('qr-scanner');

Route::get('/winners', function () {
    // Obtener ganadores publicados agrupados por año y actividad
    $winners = \App\Models\Winner::with(['participant', 'activity'])
        ->where('is_published', true)
        ->orderBy('year', 'desc')
        ->orderBy('activity_id')
        ->orderBy('position')
        ->get();
    
    // Obtener años disponibles
    $years = $winners->pluck('year')->unique()->sort()->reverse()->values();
    
    return Inertia::render('Winners', [
        'winners' => $winners,
        'years' => $years
    ]);
})->name('winners');

Route::get('/my-diplomas', function () {
    return Inertia::render('MyDiplomas');
})->name('my-diplomas');

Route::get('/admin/diplomas', function () {
    return Inertia::render('AdminDiplomas');
})->name('admin.diplomas');

Route::get('/admin/attendance', function () {
    return Inertia::render('AdminAttendance');
})->name('admin.attendance');

Route::get('/admin/winners', function () {
    return Inertia::render('AdminWinners');
})->name('admin.winners');
