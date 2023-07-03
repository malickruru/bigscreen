<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Créer le role admin & le role customer
     */
    public function run(): void
    {
        $admin = new Role();
        $admin->name = 'admin';
        $admin->save();

        $customer = new Role();
        $customer->name = 'customer';
        $customer->save();
    }
}
