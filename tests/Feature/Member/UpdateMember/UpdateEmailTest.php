<?php

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates email', function () {
    successfullyUpdateFieldWithValidData($this,'email', 'test123@gmail.com', 'test@gmail.com');
});

it('fails to update member with email that already registered', function () {
    Member::factory()->create([
        'email' => 'test@gmail.com'
    ]);

    $updateMember = Member::factory()->create();

    $response = $this->patchJson("/api/members/{$updateMember->id}", [
        'email' => 'test@gmail.com',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors('email');
});

it('fails to update member with empty email', function () {
    failToUpdateFieldWithEmptyData($this, 'email');
});

it('fails to update member with invalid email', function () {
    failToUpdateFieldWithInvalidData($this, 'email', 'qweqweqas');
});
