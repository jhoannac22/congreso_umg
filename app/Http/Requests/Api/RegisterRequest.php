<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
        $isUMGStudent = str_ends_with(strtolower($this->email ?? ''), '@miumg.edu.gt');
        
        return [
            'name' => ['required', 'string', 'max:255'],
            'firstName' => ['sometimes', 'string', 'max:255'],
            'lastName' => ['sometimes', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'confirmPassword' => ['required', 'string', 'min:6', 'same:password'],
            'role' => ['sometimes', 'string', 'in:admin,organizer,judge,participant'],
            'phone' => $isUMGStudent ? ['nullable', 'string', 'max:20'] : ['required', 'string', 'max:20'],
            'bio' => ['nullable', 'string', 'max:1000'],
                'type' => ['sometimes', 'string', 'in:interno,externo'],
            'school' => ['sometimes', 'nullable', 'string', 'max:255'],
            'studentId' => ['sometimes', 'nullable', 'string', 'max:50'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        $isUMGStudent = str_ends_with(strtolower($this->email ?? ''), '@miumg.edu.gt');
        
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.max' => 'El nombre no puede exceder 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe tener un formato válido.',
            'email.unique' => 'Ya existe una cuenta con este correo electrónico.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
            'confirmPassword.required' => 'La confirmación de contraseña es obligatoria.',
            'confirmPassword.min' => 'La confirmación de contraseña debe tener al menos 6 caracteres.',
            'confirmPassword.same' => 'La confirmación de contraseña no coincide.',
            'role.in' => 'El rol debe ser uno de: admin, organizer, judge, participant.',
            'phone.required' => $isUMGStudent ? 'El teléfono es opcional para estudiantes UMG.' : 'El teléfono es obligatorio para estudiantes externos.',
            'phone.max' => 'El teléfono no puede exceder 20 caracteres.',
            'bio.max' => 'La biografía no puede exceder 1000 caracteres.',
        ];
    }
}
