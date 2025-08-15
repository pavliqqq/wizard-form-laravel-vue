<?php

use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates birthdate', function () {
    successfullyUpdateFieldWithValidData($this,'birthdate', '2009-02-11', '2000-01-01');
});

it('fails to update member with empty birthdate', function () {
    failToUpdateFieldWithEmptyData($this, 'birthdate');
});

it('fails to update member with non-date birthdate', function () {
    failToUpdateFieldWithInvalidData($this, 'birthdate', 'qweqweqas');
});

// minimal age is 16
it('fails to update member with age lower than minimal', function () {
    $member = Member::factory()->create();

    $this->patchJson("/api/members/{$member->id}",
        ['birthdate' => Carbon::now()->subYears(16)->addDay()->toDateString()])
        ->assertStatus(422)
        ->assertJsonValidationErrors('birthdate');
});

it('successfully updates member with age exactly minimal', function () {
    $member = Member::factory()->create();

    $this->patchJson("/api/members/{$member->id}",
        ['birthdate' => Carbon::now()->subYears(16)->toDateString()])
        ->assertStatus(200);
});

it('successfully updates member with age higher than minimal', function () {
    $member = Member::factory()->create();

    $this->patchJson("/api/members/{$member->id}",
        ['birthdate' => Carbon::now()->subYears(17)->toDateString()])
        ->assertStatus(200);
});
