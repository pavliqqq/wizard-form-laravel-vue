<?php

use App\Models\Member;
use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('deletes member as admin', function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();

    $member = Member::factory()->create();

    $this->actingAs($this->admin)
        ->deleteJson("/api/admin/members/{$member->id}")
        ->assertStatus(200)
        ->assertJson(['success' => true]);

    $this->assertDatabaseMissing('members', [
        'id' => $member->id
    ]);
});

it('returns 401 when trying to delete member as non-admin', function() {
    $member = Member::factory()->create();

    $this->deleteJson("/api/admin/members/{$member->id}")
        ->assertStatus(401);
});

it('returns 404 if member not found for delete', function () {
    $this->seed(UserSeeder::class);
    $this->admin = User::where('role', 'admin')->first();

    $this->actingAs($this->admin)
        ->deleteJson("/api/admin/members/100000")
        ->assertStatus(404);
});


