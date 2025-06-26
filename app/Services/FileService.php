<?php

namespace App\Services;

use App\Models\Member;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public const DEFAULT_PHOTO = 'images/default.png';

    public static function photoService(FormRequest $request, Member $member): string
    {
        if ($request->hasFile('photo')) {
            if(!empty($member->photo)){
                Storage::disk('public')->delete($member->photo);
            }

            return $request->file('photo')->store('images', 'public');
        }
        return $member->photo ?: self::DEFAULT_PHOTO;
    }
}
