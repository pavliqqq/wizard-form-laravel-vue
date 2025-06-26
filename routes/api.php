<?php

use App\Http\Controllers\Form\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/members/first', [FormController::class, 'firstStep']);
Route::get('/members', [FormController::class, 'getAllMembers']);
Route::post('/members/second', [FormController::class, 'secondStep']);
Route::delete('/members/{member}', [FormController::class, 'delete']);

