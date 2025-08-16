<?php

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

uses(RefreshDatabase::class);

it('logouts authenticated user', function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();

    $response = $this->actingAs($this->admin)
        ->postJson("/api/logout");

    $response->assertStatus(200)
        ->assertJsonStructure(['success'])
        ->assertJson(['success' => true]);
});

it('invalidates session cookie after logout', function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();

    $cookieName = config('session.cookie');

    $loginResponse = $this->postJson("/api/login", [
        'email' => $this->admin->email,
        'password' => '12345',
    ])->assertStatus(200);

    $loginResponse->assertCookie($cookieName);

    $sessionCookie = $loginResponse->getCookie($cookieName);
    $this->assertNotNull($sessionCookie);

    $cookieValue = $sessionCookie->getValue();

    $this->withCookie($cookieName, $cookieValue)
        ->getJson('/api/me')
        ->assertStatus(200);

    $this->withCookie($cookieName, $cookieValue)
        ->postJson('/api/logout')
        ->assertStatus(200)
        ->assertJson(['success' => true]);

    $this->withCookie($cookieName, $cookieValue)
        ->getJson('/api/me')
        ->assertStatus(401);
});

it('fails to logout with unauthenticated user', function () {
    $response = $this->postJson("/api/logout");

    $response->assertStatus(401);
});
