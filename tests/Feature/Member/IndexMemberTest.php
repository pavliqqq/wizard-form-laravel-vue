<?php

use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('gets all members', function () {
    Member::factory()->count(10)->create();

    $response = $this->getJson('api/members/');

    $response->assertStatus(200)
        ->assertJson(['success' => true])
        ->assertJsonStructure([
            'success',
            'members' => [
                '*' => ['id', 'photo', 'full_name', 'report_subject', 'email', 'visibility']
            ]
        ]);
});
