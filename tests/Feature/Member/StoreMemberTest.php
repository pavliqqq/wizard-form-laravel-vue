<?php

use App\Models\Member;
use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

function memberData(array $overrides = []): array
{
    return array_merge([
        'first_name' => 'David',
        'last_name' => 'Test',
        'birthdate' => '1990-01-01',
        'report_subject' => 'Web Technologies',
        'phone' => '+380991112233',
        'country' => 'UA',
        'email' => 'david@gmail.com',
        'company' => 'TechCorp',
        'position' => 'Developer',
        'about_me' => '',
        'photo' => null,
        'visibility' => true,
    ], $overrides);
}

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

it('fails to create a member with invalid data', function () {

    $response = $this->postJson('/api/members', ['phone' => 'invalid']);

    $response->assertStatus(422)
        ->assertJsonValidationErrors([
            'first_name', 'last_name', 'birthdate', 'report_subject', 'country', 'phone', 'email'
        ]);
});

it('fails to create member with duplicate email', function () {

    Member::factory()->create([
        'email' => 'test@gmail.com'
    ]);

    $response = $this->postJson('api/members', memberData(['email' => 'test@gmail.com']));

    $response->assertStatus(422)
        ->assertJsonValidationErrors('email');
});

it('fails to create member with invalid phone', function () {

    $response = $this->postJson('api/members', memberData(['phone' => '380803316209']));

    $response->assertStatus(422)
        ->assertJsonValidationErrors('phone');
});

it('fails to create member with invalid county', function () {

    $response = $this->postJson('api/members', memberData(['country' => 'SHA']));

    $response->assertStatus(422)
        ->assertJsonValidationErrors('country');
});
