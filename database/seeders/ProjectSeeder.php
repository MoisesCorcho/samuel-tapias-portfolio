<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projectsData = [
            [
                'category' => ['PHP'],
                'title' => 'SparkMVC - PHP MVC Framework',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/SparkMVC'
            ],
            [
                'category' => ['PHP', 'Laravel', 'PHPUnit', 'Bootstrap'],
                'title' => 'Automobile Winner Landing Page & Admin Panel: Select Winner and Export Users',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/LandingPage-Challenge'
            ],
            [
                'category' => ['Laravel', 'JavaScript'],
                'title' => 'Interactive Appointment Calendar',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/Asimov-Challenge-jsonapi-Frontend'
            ],
            [
                'category' => ['PHP'],
                'title' => 'REST API for Scheduling Appointments - Plain PHP',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/DancingWithDeath-Challenge-LoginSystem'
            ],
            [
                'category' => ['Laravel', 'PHP', 'PHPUnit'],
                'title' => 'REST API for Scheduling Appointments Following The Json Api Specification - Laravel',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/Asimov-Challenge-jsonapi'
            ],
            [
                'category' => ['JavaScript', 'Tailwind CSS'],
                'title' => 'Typing Test',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/typingTest'
            ],
            [
                'category' => ['JavaScript', 'Svelte', 'Phaser 3', 'Tiled'],
                'title' => "The Developer's Journey — Portfolio Videogame",
                'image' => null,
                'github' => 'https://github.com/MoisesCorcho/portfolio-videogame'
            ],
            [
                'category' => ['PHP', 'Laravel'],
                'title' => 'JsonApi-Package',
                'image' => null,
                'github' =>  'https://github.com/MoisesCorcho/JsonApi-Package'
            ],
        ];

        foreach ($projectsData as $data) {

            $project = Project::create([
                'title' => $data['title'],
                'image' => null,
                'github' => $data['github'] ?? null,
            ]);


            if (isset($data['category']) && is_array($data['category'])) {
                $categoryIds = [];
                foreach ($data['category'] as $categoryName) {
                    $category = Category::firstOrCreate(['name' => $categoryName]);
                    $categoryIds[] = $category->id;
                }
                $project->categories()->attach($categoryIds);
            }
        }
    }
}
