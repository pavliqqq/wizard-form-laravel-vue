<?php

namespace App\Http\Controllers\API;

use App\Models\Country;

class CountryController
{
    public function index()
    {
        return Country::all();
    }
}
