<?php

use App\Models\Member;
use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns user data', function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();

    $response = $this->actingAs($this->admin, 'sanctum')
        ->getJson("/api/me");

    $response->assertStatus(200)
        ->assertJsonStructure(['id', 'name', 'role'])
        ->assertJson([
            'id' => $this->admin->id,
            'name' => $this->admin->name,
            'role' => $this->admin->role
        ]);
});

it('returns 401 if user unauthenticated', function () {
    $response = $this->getJson('/api/me');

    $response->assertStatus(401);
});


