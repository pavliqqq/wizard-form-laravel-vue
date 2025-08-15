<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MinAge implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    protected $minAge = 16;

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $birthdate = Carbon::parse($value);

        $age = $birthdate->age;

        if ($age < $this->minAge) {
            $fail('You must be at least ' . $this->minAge . ' years old.');
        }
    }
}
