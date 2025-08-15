<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;


require_once __DIR__ . '/Helpers/StoreHelpers.php';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(CountrySeeder::class);
});

it('fails to create member with invalid phone', function () {
    $response = $this->postJson('api/members', memberData(['phone' => 'asdqweqwe']));

    $response->assertStatus(422)
        ->assertJsonValidationErrors('phone');
});

it('fails to create member with phone not valid for country', function () {
    $response = $this->postJson('api/members', memberData(['phone' => '380803316209']));

    $response->assertStatus(422)
        ->assertJsonValidationErrors('phone');
});
