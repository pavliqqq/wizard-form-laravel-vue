<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates first name', function () {
    successfullyUpdateFieldWithValidData($this,'first_name', 'Peter', 'Max');
});

it('fails to update member with empty first name', function () {
    failToUpdateFieldWithEmptyData($this, 'first_name');
});

it('fails to update member with invalid first name', function () {
    failToUpdateFieldWithInvalidData($this, 'first_name', 'a');
});
