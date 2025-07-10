<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MemberController;
use Illuminate\Support\Facades\Route;

Route::prefix('members')->group(function () {
    Route::post('/', [MemberController::class, 'store']);
    Route::get('/', [MemberController::class, 'index']);
    Route::patch('/{member}', [MemberController::class, 'update']);
    Route::get('/share', [MemberController::class, 'sharePage']);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::post('/toggle/{member}', [MemberController::class, 'toggleVisibility']);
        Route::delete('/{member}', [MemberController::class, 'destroy']);
    });
});
