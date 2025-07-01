<?php

namespace App\Http\Requests\Form;

use App\Rules\CountryCheck;
use Illuminate\Foundation\Http\FormRequest;

class FirstStepRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required | string | min:2 | max:50',
            'last_name' => 'required | string | min:2 | max:50',
            'birthdate' => 'required | date | before: -16 years',
            'report_subject' => 'required | min:2 | max:500',
            'country' => ['required', new CountryCheck()],
            'phone' => 'required',
            'phone_valid' => 'accepted',
            'email' => 'required | email',
        ];
    }

    public function messages(): array
    {
        return [
            'birthdate.before' => 'You must be at least 16 years old.',
            'phone_valid.accepted' => 'Invalid phone number.',
        ];
    }
}
