<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->preventRequestForgery (except: [
            'http://jemosistemas-domain.com/inertia-assefrak/auth/register',
            'http://jemosistemas-domain.com/inertia-assefrak/auth/login',
            'http://jemosistemas-domain.com/inertia-assefrak/empresa/*',
            'https://www.jemosistemas.com.br/inertia-assefrak/public/index.php/auth/register',
            'https://www.jemosistemas.com.br/inertia-assefrak/public/index.php/auth/login',
            'http://assefrak-domain.com:8010/inertia-assefrak/auth/register',
            'http://assefrak-domain.com:8010/inertia-assefrak/auth/login',
            'http://assefrak-domain.com:8010/inertia-assefrak/empresa/*',
            'https://www.assefrak.com.br/inertia-assefrak/public/index.php/auth/register',
            'https://www.assefrak.com.br/inertia-assefrak/public/index.php/auth/login'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
    })->create();
