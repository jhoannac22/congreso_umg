<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Forzar HTTPS en producción (Railway, Vercel, etc.)
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        // Confiar en proxies (Railway usa proxies reversos)
        $this->app['request']->server->set('HTTPS', 'on');
    }
}
