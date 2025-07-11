<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

class UserController
{
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
        ]);
    }
}
