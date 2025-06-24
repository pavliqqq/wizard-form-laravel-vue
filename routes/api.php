<?php

use App\Http\Controllers\Member\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/members', [MemberController::class, 'store']);
Route::get('/members', [MemberController::class, 'index']);
Route::patch('/members/{member}', [MemberController::class, 'update']);
Route::delete('/members/{member}', [MemberController::class, 'delete']);

