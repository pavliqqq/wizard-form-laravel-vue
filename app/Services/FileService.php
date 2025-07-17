<?php

namespace App\Services;

use App\Models\Member;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public static function fileHandler(FormRequest $request, string $field, ?Member $member = null): string
    {
        $defaultFilePath = config('file.defaultImagePath');

        if ($request->hasFile($field)) {
            return $request->file($field)->store('images', 'public');
        }

        return $member?->$field ?: $defaultFilePath;
    }

    public static function defaultFileCopy(): void
    {
        $defaultFilePath = config('file.defaultImagePath');

        if (! Storage::disk('public')->exists($defaultFilePath)) {
            $source = public_path($defaultFilePath);
            $target = Storage::disk('public')->path($defaultFilePath);

            Storage::disk('public')->makeDirectory('images');
            copy($source, $target);
        }
    }
}
