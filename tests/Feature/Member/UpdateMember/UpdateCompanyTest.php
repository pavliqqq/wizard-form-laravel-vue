<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates company', function () {
    successfullyUpdateFieldWithValidData($this,'company', 'Techno', 'Star');
});

it('successfully updates member with empty company', function () {
    successfullyUpdateFieldWithEmptyData($this, 'company');
});

it('fails to update member with invalid company', function () {
    failToUpdateFieldWithInvalidData($this, 'company', 'a');
});
