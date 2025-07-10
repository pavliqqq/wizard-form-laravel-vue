<?php

namespace App\Observers;

use App\Models\Member;
use App\Services\FileService;
use Illuminate\Support\Facades\Storage;

class DeleteOldFilesObserver
{
    public function updating(Member $member): void
    {
        $oldPhoto = $member->getOriginal('photo');
        $newPhoto = $member->photo;

        if ($oldPhoto && $oldPhoto !== FileService::DEFAULT_PHOTO && $oldPhoto !== $newPhoto) {
            Storage::disk('public')->delete($oldPhoto);
        }
    }

    public function deleting(Member $member): void
    {
        $photo = $member->photo;

        if ($photo && $photo !== FileService::DEFAULT_PHOTO) {
            Storage::disk('public')->delete($photo);
        }
    }
}
