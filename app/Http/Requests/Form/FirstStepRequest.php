<?php

namespace App\Http\Requests\Form;

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
            'birthdate' => 'required | date',
            'report_subject' => 'required | min:2 | max:500',
            'country' => 'required | string | size:2',
            'phone' => 'required | string ',
            'email' => 'required | email',
        ];
    }
}
