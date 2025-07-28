<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class MemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birthdate' => fake()->date(),
            'report_subject' => fake()->sentence(),
            'phone' => fake()->phoneNumber(),
            'country' => fake()->countryCode(),
            'email' => fake()->unique()->safeEmail(),
            'company' => fake()->sentence(),
            'position' => fake()->sentence(),
            'about_me' => fake()->text(),
            'photo' => fake()->filePath(),
            'visibility' => true,
        ];
    }
}
