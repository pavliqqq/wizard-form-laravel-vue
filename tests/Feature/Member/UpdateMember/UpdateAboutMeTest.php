<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates about me field', function () {
    successfullyUpdateFieldWithValidData($this,'about_me', 'Smile', 'Please');
});

it('successfully updates member with empty about me field', function () {
    successfullyUpdateFieldWithEmptyData($this, 'about_me');
});

it('fails to update member with invalid about me field', function () {
    failToUpdateFieldWithInvalidData($this, 'about_me', 'a');
});
