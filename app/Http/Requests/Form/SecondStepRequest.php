<?php

namespace App\Http\Requests\Form;

use Illuminate\Foundation\Http\FormRequest;

class SecondStepRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'id' => 'required',
            'company' => 'nullable | string | min: 2 | max: 100',
            'position' => 'nullable | string | min: 2 | max: 100',
            'about_me' => 'nullable | min: 2 | max: 1000',
            'photos' => 'nullable | image | mimes:jpg,jpeg,png,gif | max:512'
        ];
    }
}
