<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Form\FormController;
use Illuminate\Support\Facades\Route;


Route::prefix('members')->group(function (){
    Route::post('/first', [FormController::class, 'firstStep']);
    Route::get('/all', [FormController::class, 'getAllMembers']);
    Route::post('/second', [FormController::class, 'secondStep']);
    Route::get('/third', [FormController::class, 'thirdStep']);
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

