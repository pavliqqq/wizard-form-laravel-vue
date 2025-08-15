<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CountryController;
use App\Http\Controllers\API\MemberController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/countries', [CountryController::class, 'index']);

Route::prefix('members')->group(function () {
    Route::post('/', [MemberController::class, 'store']);
    Route::get('/', [MemberController::class, 'index']);
    Route::patch('/{member}', [MemberController::class, 'update']);
    Route::get('/share', [MemberController::class, 'sharePage']);
});

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('guest');

    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/me', [UserController::class, 'me']);

        Route::prefix('admin')->group(function () {
            Route::prefix('members')->group(function () {
                Route::patch('/{member}', [MemberController::class, 'update']);
                Route::post('/toggle/{member}', [MemberController::class, 'toggleVisibility']);
                Route::delete('/{member}', [MemberController::class, 'destroy']);
            });
        });
    });
});
