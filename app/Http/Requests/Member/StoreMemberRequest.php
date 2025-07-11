<?php

namespace App\Http\Requests\Member;

use App\Rules\CountryCheck;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMemberRequest extends FormRequest
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
            'country' => ['required', new CountryCheck],
            'phone' => 'required | string | min:10 | max: 20',
            'email' => ['required', Rule::unique('members'), 'email:rfc,dns'],
            'company' => 'nullable | string | min: 2 | max: 100',
            'position' => 'nullable | string | min: 2 | max: 100',
            'about_me' => 'nullable | min: 2 | max: 1000',
            'photo' => 'nullable | image | mimes:jpg,jpeg,png,gif | max:512',
            'visibility' => 'nullable | boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'birthdate.before' => 'You must be at least 16 years old.',
        ];
    }
}
