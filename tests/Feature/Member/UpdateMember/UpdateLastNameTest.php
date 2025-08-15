<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates last name', function () {
    successfullyUpdateFieldWithValidData($this,'last_name', 'Parker', 'Freedom');
});

it('fails to update member with empty last name', function () {
    failToUpdateFieldWithEmptyData($this, 'last_name');
});

it('fails to update member with invalid last name', function () {
    failToUpdateFieldWithInvalidData($this, 'last_name', 'a');
});
