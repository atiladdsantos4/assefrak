<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ReportController;


// Route::get('/', function () {
//     return view('welcome');
// });

/*routes forn end*/
Route::get('/admin', function () {
   //return view('welcome');
   return Inertia::render('Admin');
});

Route::get('/', function () {
   //return view('welcome');
   return Inertia::render('Main');
});

/*login e token */
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);


Route::prefix('empresa')->group(function () {
   Route::post('storeapi', [EmpresaController::class, 'storeApi'])->name('empresa.storeApi');
   Route::post('store', [EmpresaController::class, 'store'])->name('empresa.store');
   Route::get('index', [EmpresaController::class, 'index'])->name('empresa.index');
});

Route::prefix('relatorio')->group(function () {
   //Route::post('storeapi', [EmpresaController::class, 'storeApi'])->name('empresa.storeApi');
   //Route::post('store', [EmpresaController::class, 'store'])->name('empresa.store');
   Route::get('ficha', [ReportController::class, 'index'])->name('report.index');
   Route::get('fichatratamento', [ReportController::class, 'index'])->name('report.index');
   Route::get('listapresenca', [ReportController::class, 'index'])->name('report.index');
});



