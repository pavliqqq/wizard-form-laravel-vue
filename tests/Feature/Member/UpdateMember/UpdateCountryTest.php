<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates country', function () {
    $this->seed(CountrySeeder::class);
    successfullyUpdateFieldWithValidData($this,'country', 'AG', 'UA');
});

it('fails to update member with empty country', function () {
    failToUpdateFieldWithEmptyData($this, 'country');
});

it('fails to update member with invalid country', function () {
    failToUpdateFieldWithInvalidData($this, 'country', 'qweqweqas');
});
