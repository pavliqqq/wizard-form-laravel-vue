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
        self::defaultImageCopy();

        if ($request->hasFile('photo')) {
            if (!empty($member->photo) && $member->photo !== self::DEFAULT_PHOTO) {
                Storage::disk('public')->delete($member->photo);
            }

            return $request->file('photo')->store('images', 'public');
        }
        return $member->photo ?: self::DEFAULT_PHOTO;
    }

    private static function defaultImageCopy(): void
    {
        if (!Storage::disk('public')->exists(self::DEFAULT_PHOTO)) {
            $source = public_path(self::DEFAULT_PHOTO);
            $target = Storage::disk('public')->path(self::DEFAULT_PHOTO);

            Storage::disk('public')->makeDirectory('images');
            copy($source, $target);

        }
    }
}
