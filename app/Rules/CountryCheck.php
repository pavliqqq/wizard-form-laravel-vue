<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CountryCheck implements ValidationRule
{
    private const COUNTRY_CODES_PATH = 'countries/iso2_codes.json';
    /**
     * Run the validation rule.
     *
     * @param \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $path = resource_path(self::COUNTRY_CODES_PATH);
        $validCountryCodes = json_decode(file_get_contents($path), true);

        if (!in_array(strtolower($value), $validCountryCodes)) {
            $fail('Invalid country name');
        }
    }
}
