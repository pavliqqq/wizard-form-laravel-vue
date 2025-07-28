<?php

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);


it('logouts authenticated user', function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();

    $response = $this->actingAs($this->admin, 'sanctum')
        ->postJson("/api/logout");

    $response->assertStatus(200)
        ->assertJsonStructure(['success'])
        ->assertJson(['success' => true]);
});

it('fails to logout with unauthenticated user', function () {
    $response = $this->postJson("/api/logout");

    $response->assertStatus(401);
});
