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
                'category' => ['C#', 'Unity'],
                'title' => 'Mar y cielo (Game Jam Cultura Abierta 2025)',
                'image' => '/img/projects/mar_y_cielo.jpg',
                'github' => 'https://github.com/SamFabra570/MarYCielo'
            ],
            [
                'category' => ['C#', 'Unity'],
                'title' => 'But Why?... (Game Jam Cultura Abierta 2025)',
                'image' => '/img/projects/but_why.png',
                'github' => 'https://github.com/SamFabra570/CozyWinterJam2026'
            ],
        ];

        foreach ($projectsData as $data) {

            $project = Project::create([
                'title' => $data['title'],
                'image' => $data['image'] ?? null,
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
