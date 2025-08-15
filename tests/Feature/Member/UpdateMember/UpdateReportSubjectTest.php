<?php

use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

require_once __DIR__ . '/Helpers/UpdateHelpers.php';

uses(RefreshDatabase::class);

it('successfully updates report subject', function () {
    successfullyUpdateFieldWithValidData($this,'report_subject', 'Spiders', 'Biology');
});

it('fails to update member with empty report subject', function () {
    failToUpdateFieldWithEmptyData($this, 'report_subject');
});

it('fails to update member with invalid report subject', function () {
    failToUpdateFieldWithInvalidData($this, 'report_subject', 'a');
});
