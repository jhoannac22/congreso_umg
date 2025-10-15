<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrador del Sistema',
                'email' => 'admin@congreso.umg.edu.gt',
                'password' => bcrypt('admin123'),
                'role' => 'admin',
                'phone' => '+502 1234-5678',
                'bio' => 'Administrador principal del sistema de gestión del congreso',
                'is_active' => true,
            ],
            [
                'name' => 'Organizador Principal',
                'email' => 'organizador@congreso.umg.edu.gt',
                'password' => bcrypt('org123'),
                'role' => 'organizer',
                'phone' => '+502 2345-6789',
                'bio' => 'Coordinador general del congreso de tecnología',
                'is_active' => true,
            ],
            [
                'name' => 'Juez Principal',
                'email' => 'juez@congreso.umg.edu.gt',
                'password' => bcrypt('juez123'),
                'role' => 'judge',
                'phone' => '+502 3456-7890',
                'bio' => 'Juez principal de las competencias del congreso',
                'is_active' => true,
            ],
            [
                'name' => 'Participante Demo',
                'email' => 'participante@congreso.umg.edu.gt',
                'password' => bcrypt('demo123'),
                'role' => 'participant',
                'phone' => '+502 4567-8901',
                'bio' => 'Cuenta de demostración para participantes',
                'is_active' => true,
            ],
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }
    }
}
