<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates phone', function () {
    successfullyUpdateFieldWithValidData($this,'phone', '+380991112233', '+380636465667');
});

it('fails to update member with empty phone', function () {
    failToUpdateFieldWithEmptyData($this, 'phone');
});

it('fails to update member with invalid phone', function () {
    failToUpdateFieldWithInvalidData($this, 'phone', 'qweqweqas');
});
