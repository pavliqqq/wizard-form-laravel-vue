<?php

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

require __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates member with photo', function () {
    Storage::fake('public');

    $member = Member::factory()->create();
    $photo = UploadedFile::fake()->create('photo.jpg', 450, 'image/jpeg');

    $this->patchJson("/api/members/{$member->id}",
        ['photo' => $photo])
        ->assertStatus(200);

    Storage::disk('public')->assertExists('images/' . $photo->hashName());

    $member->refresh();
    expect($member->photo)->toBe('images/' . $photo->hashName());
});

it('successfully updates member with empty photo', function () {
    successfullyUpdateFieldWithEmptyData($this, 'company');
});

it('fails to update member with invalid photo file type', function () {
    Storage::fake('public');

    $member = Member::factory()->create();
    $photo = UploadedFile::fake()->create('photo.pdf', 450, 'application/pdf');

    $this->patchJson("/api/members/{$member->id}",
        ['photo' => $photo])
        ->assertStatus(422)
        ->assertJsonValidationErrors('photo');
});

// max size of file - 500Kb
it('fails to update member with invalid photo file size', function () {
    Storage::fake('public');

    $member = Member::factory()->create();
    $photo = UploadedFile::fake()->create('photo.jpg', 750, 'image/jpeg');

    $this->patchJson("/api/members/{$member->id}",
        ['photo' => $photo])
        ->assertStatus(422)
        ->assertJsonValidationErrors('photo');
});
