<?php

use App\Models\Member;
use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();
});

it('deletes member as admin', function () {
    $member = Member::factory()->create();

    $response = $this->actingAs($this->admin, 'sanctum')
        ->deleteJson("/api/admin/members/{$member->id}");

    $response->assertStatus(200)
        ->assertJson(['success' => true]);
});

it('returns 404 if member not found for delete', function () {
    $response = $this->actingAs($this->admin, 'sanctum')
        ->deleteJson("/api/admin/members/100000");

    $response->assertStatus(404);
});


