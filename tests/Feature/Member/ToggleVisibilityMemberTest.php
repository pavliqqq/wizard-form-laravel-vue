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

it('toggles member visibility as admin', function () {
    $member = Member::factory()->create();

    $this->actingAs($this->admin)
        ->postJson("/api/admin/members/toggle/{$member->id}")
        ->assertStatus(200)
        ->assertJsonStructure(['success', 'visible']);

    $member->refresh();
    expect((bool)$member->visibility)->toBeFalse();
});

it('returns 401 when trying to toggle member visibility as non-admin', function() {
    $member = Member::factory()->create();

    $this->postJson("/api/admin/members/toggle/{$member->id}")
        ->assertStatus(401);
});

it('returns 404 if member not found for toggle', function () {
    $response = $this->actingAs($this->admin)
        ->postJson("/api/admin/members/toggle/100000");

    $response->assertStatus(404);
});
