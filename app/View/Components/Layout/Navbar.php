<?php

namespace App\View\Components\Layout;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Navbar extends Component
{
    public array $navigationItems = [];

    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->navigationItems = [
            ['label' => __('home.nav_about'),      'href' => '#about'],
            ['label' => __('home.nav_projects'),   'href' => '#portfolio'],
            ['label' => __('home.nav_experience'), 'href' => '#experience'],
            ['label' => __('home.nav_vg'),         'href' => '#videogame'],
            ['label' => __('home.nav_contact'),    'href' => '#contact'],
        ];
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('layout.navbar');
    }
}
