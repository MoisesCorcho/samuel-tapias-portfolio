<?php

namespace App\View\Components\Home;

use Closure;
use App\Models\Project;
use Illuminate\Support\Arr;
use Illuminate\View\Component;
use Illuminate\Support\Collection;
use Illuminate\Contracts\View\View;

class Portfolio extends Component
{
    public array|Collection $items = [];
    public array $tabs = [];

    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->items = Project::with('categories')->get();

        $categories = $this->items->map(function ($item, $key) {
            return $item->categories->pluck('name')->toArray();
        });

        $this->tabs = array_unique(Arr::flatten($categories));
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.home.portfolio');
    }
}
