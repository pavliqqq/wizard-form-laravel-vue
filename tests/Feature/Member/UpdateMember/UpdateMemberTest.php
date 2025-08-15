<?php

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns 401 when trying to update member as non-admin', function () {
    $member = Member::factory()->create();

    $this->patchJson("/api/admin/members/{$member->id}")
        ->assertStatus(401);
});

it('returns 404 when member not found for update', function () {
    $response = $this->patchJson("/api/members/100000");

    $response->assertStatus(404);
});
