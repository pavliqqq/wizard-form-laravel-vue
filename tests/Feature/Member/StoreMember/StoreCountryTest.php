<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/StoreHelpers.php';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(CountrySeeder::class);
});

it('fails to create member with not existent county code', function () {
    $this->postJson('api/members', memberData(['country' => 'SHA']))
        ->assertStatus(422)
        ->assertJsonValidationErrors('country');
});

it('fails to create member with invalid county code', function () {
    $this->postJson('api/members', memberData(['country' => '2123123']))
        ->assertStatus(422)
        ->assertJsonValidationErrors('country');
});
