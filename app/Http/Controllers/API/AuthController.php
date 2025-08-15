<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\User\AuthRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    public function login(AuthRequest $request)
    {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            $request->session()->regenerate();

            return response()->json(['success' => true]);
        }

        return response()->json(['errors' => ['email' => ['The provided credentials do not match our records.']]], 422);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }
}
