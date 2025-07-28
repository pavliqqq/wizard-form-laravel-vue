<?php

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('updates member', function () {
    $member = Member::factory()->create();

    $response = $this->patchJson("/api/members/{$member->id}", [
        'first_name' => 'Lukas',
    ]);

    $response->assertStatus(200)
        ->assertJson(['success' => true])
        ->assertJsonStructure(['success', 'count']);

    expect($response['count'])->toBe(1);

    $member->refresh();
    expect($member->first_name)->toBeString('Lukas');
});

it('returns 404 if member not found for update', function () {
    $response = $this->patchJson("/api/members/100000");

    $response->assertStatus(404);
});

