<?php

use App\Models\Member;
use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/StoreHelpers.php';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(CountrySeeder::class);
});

it('fails to create member with duplicate email', function () {
    Member::factory()->create([
        'email' => 'test@gmail.com'
    ]);

    $this->postJson('api/members', memberData(['email' => 'test@gmail.com']))
        ->assertStatus(422)
        ->assertJsonValidationErrors('email');
});

it('fails to create member with invalid email', function () {
    $this->postJson('api/members', memberData(['email' => 'asdqwqeq']))
        ->assertStatus(422)
        ->assertJsonValidationErrors('email');
});
