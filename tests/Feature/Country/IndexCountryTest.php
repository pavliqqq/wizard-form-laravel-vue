<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
   $this->seed(CountrySeeder::class);
});

it('gets all countries', function () {

    $response = $this->getJson('api/countries');

    $response->assertStatus(200)
        ->assertJson(['success' => true])
        ->assertJsonStructure([
            'success',
            'countries' => [
                '*' => ['id', 'name', 'code']
            ]
        ]);
});
