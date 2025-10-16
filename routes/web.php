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
    return Inertia::render('Dashboard');
})->name('dashboard');

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
