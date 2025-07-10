<?php

namespace App\Http\Requests\Admin;

use App\Rules\FullNameCheck;
use Illuminate\Foundation\Http\FormRequest;

class MemberUpdateRequest extends FormRequest
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
            'photo' => 'nullable | image | mimes:jpg,jpeg,png,gif | max:512',
            'full_name' => ['required', 'string', 'min:2', 'max:100', new FullNameCheck],
            'report_subject' => 'required | min:2 | max:500',
            'email' => 'required | email',
        ];
    }
}
