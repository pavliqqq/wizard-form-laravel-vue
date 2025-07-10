<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Member\MemberController;
use Illuminate\Support\Facades\Route;


Route::prefix('members')->group(function (){
    Route::post('/first', [MemberController::class, 'store']);
    Route::get('/', [MemberController::class, 'index']);
    Route::patch('/{member}', [MemberController::class, 'update']);
    Route::get('/third', [MemberController::class, 'thirdStep']);
});

Route::prefix('admin')->group(function (){
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function(){
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::prefix('members')->group(function () {
            Route::post('/{member}', [AdminController::class, 'update']);
            Route::post('/toggle/{member}', [AdminController::class, 'toggleVisibility']);
            Route::delete('/{member}', [AdminController::class, 'delete']);
        });
    });
});

