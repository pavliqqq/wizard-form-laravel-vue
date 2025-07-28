<?php

use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(UserSeeder::class);
});

it('logins with correct data', function () {
    $response = $this->postJson("/api/login", [
        'email' => 'admin@gmail.com',
        'password' => '12345',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure(['success'])
        ->assertJson(['success' => true]);
});

it('fails to login with incorrect data', function () {
    $response = $this->postJson("/api/login", [
        'email' => 'admin@gmail.com',
        'password' => '123456789',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors('email');
});
