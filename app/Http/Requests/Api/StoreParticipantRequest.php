<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreParticipantRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:participants,email'],
            'phone' => $isUMGStudent ? ['nullable', 'string', 'max:20'] : ['required', 'string', 'max:20'],
            'type' => ['required', 'string', 'in:interno,externo'],
            'school' => ['required_if:type,externo', 'nullable', 'string', 'max:255'],
            'student_id' => ['required_if:type,interno', 'nullable', 'string', 'max:50'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        $isUMGStudent = str_ends_with(strtolower($this->email ?? ''), '@miumg.edu.gt');
        
        return [
            'first_name.required' => 'El nombre es obligatorio.',
            'first_name.max' => 'El nombre no puede exceder 255 caracteres.',
            'last_name.required' => 'El apellido es obligatorio.',
            'last_name.max' => 'El apellido no puede exceder 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe tener un formato válido.',
            'email.unique' => 'Ya existe un participante con este correo electrónico.',
            'phone.required' => $isUMGStudent ? 'El teléfono es opcional para estudiantes UMG.' : 'El teléfono es obligatorio para estudiantes externos.',
            'phone.max' => 'El teléfono no puede exceder 20 caracteres.',
            'type.required' => 'El tipo de participante es obligatorio.',
            'type.in' => 'El tipo debe ser "interno" o "externo".',
            'school.required_if' => 'El colegio es obligatorio para participantes externos.',
            'school.max' => 'El colegio no puede exceder 255 caracteres.',
            'student_id.required_if' => 'El número de estudiante es obligatorio para participantes internos.',
            'student_id.max' => 'El número de estudiante no puede exceder 50 caracteres.',
        ];
    }
}
