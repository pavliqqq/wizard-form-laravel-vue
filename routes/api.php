<?php

use App\Http\Controllers\Form\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/members', [FormController::class, 'firstStep']);
Route::get('/members', [FormController::class, 'getAllMembers']);
Route::patch('/members/{member}', [FormController::class, 'secondStep']);
Route::delete('/members/{member}', [FormController::class, 'delete']);

