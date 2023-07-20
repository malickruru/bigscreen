<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Créer un administrateur et 100 client
     *
     */
    public function run(): void
    {
        // créer l'admin 
        $admin = new User();
        $admin->name = 'admin';
        $admin->email = 'admin@gmail.com';
        $admin->password = Hash::make('admin');
        $admin->role_id = 1;
        $admin->save();

        // créer 100 clients
        User::factory()->count(100)->create();
    }
}
