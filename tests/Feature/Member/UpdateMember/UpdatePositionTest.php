<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates position', function () {
    successfullyUpdateFieldWithValidData($this,'position', 'trainee', 'junior');
});

it('successfully updates member with empty position', function () {
    successfullyUpdateFieldWithEmptyData($this, 'position');
});

it('fails to update member with invalid position', function () {
    failToUpdateFieldWithInvalidData($this, 'position', 'a');
});

