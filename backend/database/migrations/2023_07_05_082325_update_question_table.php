<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->foreignId('survey_id')->onDelete('cascade')->change();
        });

        Schema::table('choices', function (Blueprint $table) {
            $table->foreignId('question_id')->onDelete('cascade')->change();
        });

        Schema::table('answers', function (Blueprint $table) {
            $table->foreignId('question_id')->onDelete('cascade')->change();
        });
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
