<?php


use App\Models\Member;

function successfullyUpdateFieldWithValidData($test, string $field, string $dataBefore, string $newData): void
{
    $member = Member::factory()->create([
        $field => $dataBefore
    ]);

    $response = $test->patchJson("/api/members/{$member->id}", [
        $field => $newData,
    ]);

    $response->assertStatus(200)
        ->assertJson(['success' => true])
        ->assertJsonStructure(['success', 'count']);

    expect($response['count'])->toBe(1);

    $member->refresh();
    expect($member->$field)->toBe($newData);
}

function failToUpdateFieldWithEmptyData($test, string $field): void
{
    $member = Member::factory()->create();

    $response = $test->patchJson("/api/members/{$member->id}", [
        $field => '',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors($field);
}

function successfullyUpdateFieldWithEmptyData($test, string $field):void
{
    $member = Member::factory()->create();

    $response = $test->patchJson("/api/members/{$member->id}", [
        $field => '',
    ]);

    $response->assertStatus(200)
        ->assertJson(['success' => true]);
}

function failToUpdateFieldWithInvalidData($test, string $field, string $invalidData):void
{
    $member = Member::factory()->create();

    $response = $test->patchJson("/api/members/{$member->id}", [
        $field => $invalidData,
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors($field);
}
