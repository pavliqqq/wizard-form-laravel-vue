<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\AdminRequest;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    public function login(AdminRequest $request)
    {
        $data = $request->validated();

        $email = $data['email'];
        $password = $data['password'];

        $admin = Admin::where('email', $email)->first();

        if (!$admin) {
            return response()->json(['message' => 'Not found'], 404);
        }
        if (!Hash::check($password, $admin->password)) {
            return response()->json(['message' => 'Incorrect password'], 401);
        }

        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => $admin
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
