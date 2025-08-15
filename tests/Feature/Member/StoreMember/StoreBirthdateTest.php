<?php

use Carbon\Carbon;
use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/StoreHelpers.php';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(CountrySeeder::class);
});

it('fails to create member with non-date birthdate', function () {
    $this->postJson('api/members', memberData(['birthdate' => 'asdqwqeq']))
        ->assertStatus(422)
        ->assertJsonValidationErrors('birthdate');
});

// minimal age is 16
it('fails to create member with age lower than minimal', function () {
    $this->postJson('api/members', memberData(['birthdate' => Carbon::now()->subYears(16)->addDay()->toDateString()]))
        ->assertStatus(422)
        ->assertJsonValidationErrors('birthdate');
});

it('creates member with age exactly minimal', function () {
    $this->postJson('api/members', memberData(['birthdate' => Carbon::now()->subYears(16)->toDateString()]))
        ->assertStatus(200);
});

it('creates member with age higher than minimal', function () {
    $this->postJson('api/members', memberData(['birthdate' => Carbon::now()->subYears(17)->toDateString()]))
        ->assertStatus(200);
});
