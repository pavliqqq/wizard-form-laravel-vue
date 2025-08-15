<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

require_once __DIR__ . '/Helpers/StoreHelpers.php';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(CountrySeeder::class);
});

it('creates a valid member', function () {
    Storage::fake('public');
    $photo = UploadedFile::fake()->create('photo.jpg', 450, 'image/jpeg');
    $response = $this->postJson('api/members', memberData(['photo' => $photo]));

    $response->assertStatus(200)
        ->assertJson(['success' => true])
        ->assertJsonStructure(['success', 'id', 'email']);

    Storage::disk('public')->assertExists('images/' . $photo->hashName());
});

it('fails to create a member with empty data in required fields', function () {
    $response = $this->postJson('/api/members', [
        'first_name' => '',
        'last_name' => '',
        'birthdate' => '',
        'report_subject' => '',
        'country' => '',
        'phone' => '',
        'email' => '',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'first_name', 'last_name', 'birthdate', 'report_subject', 'country', 'phone', 'email'
        ]);
});
