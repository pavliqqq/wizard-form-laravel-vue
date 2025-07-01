<?php

namespace App\Services;

use App\Models\Member;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    public static function isAdmin(Request $request): bool
    {
        $token = $request->bearerToken();
        if (!$token) return false;

        $accessToken = PersonalAccessToken::findToken($token);
        if ($accessToken) {
            $accessToken->tokenable;
        }

        return true;
    }
}
