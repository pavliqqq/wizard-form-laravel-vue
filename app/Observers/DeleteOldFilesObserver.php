<?php

namespace App\Observers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DeleteOldFilesObserver
{
    protected array $fileFields;

    protected string $defaultFilePath;

    public function __construct(array $fileFields, string $defaultFilePath = '')
    {
        $this->fileFields = $fileFields;
        $this->defaultFilePath = $defaultFilePath;
    }

    public function updated(Model $model): void
    {
        foreach ($this->fileFields as $field) {
            $oldFile = $model->getOriginal($field);
            $newFile = $model->$field;

            if ($oldFile && $oldFile !== $newFile && $oldFile !== $this->defaultFilePath) {
                Storage::disk('public')->delete($oldFile);
            }
        }
    }

    public function deleted(Model $model): void
    {
        foreach ($this->fileFields as $field) {
            $file = $model->$field;

            if ($file && $file !== $this->defaultFilePath) {
                Storage::disk('public')->delete($file);
            }
        }
    }
}
