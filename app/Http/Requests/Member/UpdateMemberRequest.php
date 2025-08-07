<?php

namespace App\Http\Requests\Member;

use App\Rules\FullName;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMemberRequest extends FormRequest
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
        $member = $this->route('member');

        return [
            'full_name' => ['sometimes', 'required', 'string', 'min:2', 'max:100', new FullName],
            'first_name' => 'sometimes | required | string | min:2 | max:50',
            'last_name' => 'sometimes | required | string | min:2 | max:50',
            'birthdate' => 'sometimes | required | date | before: -16 years',
            'report_subject' => 'sometimes | required | min:2 | max:500',
            'country' => ['sometimes', 'required', 'exists:countries,code'],
            'phone' => ['sometimes', 'required', 'phone:' . $this->input('country')],
            'email' => ['sometimes', 'required', Rule::unique('members')->ignore($member->id, 'id'), 'email:rfc,dns'],
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
            'phone.phone' => 'The phone number is not valid for the selected country.',
        ];
    }

    public function prepareForValidation(): void
    {
        if ($this->filled('full_name')) {
            $fullName = trim($this->input('full_name'));
            $parts = preg_split('/\s+/', $fullName, 2);

            $this->merge([
                'first_name' => $parts[0] ?? '',
                'last_name' => $parts[1] ?? '',
            ]);
        }
    }
}
