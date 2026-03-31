{{-- ====== Portfolio Section ====== --}}
<section
    id="portfolio"
    x-data="{ selectedTab: 'all' }"
    class="relative pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden"
    style="background: linear-gradient(180deg, #040d1b 0%, #131e35 50%, #040d1b 100%);"
>

    {{-- Floating circles background --}}
    <ul class="portfolio-circles" aria-hidden="true">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
    </ul>

    {{-- Aurora orbs --}}
    <div class="portfolio-aurora-orb" style="width:700px;height:700px;background:rgba(245,158,11,0.07);top:5%;left:15%;animation:portfolioOrbA 17s ease-in-out infinite alternate;"></div>
    <div class="portfolio-aurora-orb" style="width:600px;height:600px;background:rgba(99,102,241,0.06);top:45%;left:55%;animation:portfolioOrbB 21s ease-in-out infinite alternate;"></div>
    <div class="portfolio-aurora-orb" style="width:500px;height:500px;background:rgba(245,158,11,0.05);top:65%;left:5%;animation:portfolioOrbC 13s ease-in-out infinite alternate;"></div>
    <div class="portfolio-aurora-orb" style="width:800px;height:800px;background:rgba(79,70,229,0.04);top:-15%;left:45%;animation:portfolioOrbD 25s ease-in-out infinite alternate;"></div>
    <div class="portfolio-aurora-orb" style="width:450px;height:450px;background:rgba(245,158,11,0.06);top:35%;left:75%;animation:portfolioOrbE 19s ease-in-out infinite alternate;"></div>

    <div class="container relative z-10">

        {{-- Section header --}}
        <div class="text-center mb-14 reveal-up">
            <span class="section-label justify-center" data-scramble data-original="{{ __('home.portfolio_label') }}">{{ __('home.portfolio_label') }}</span>
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 mb-4"
                style="font-family:var(--font-display); overflow:hidden;"
                data-clip-reveal>
                {{ __('home.portfolio_heading') }}
                <span class="gradient-text-static">{{ __('home.portfolio_heading_accent') }}</span>
            </h2>
            <p class="text-slate-400 max-w-md mx-auto" style="font-family:var(--font-body); font-size:0.95rem;">
                {{ __('home.portfolio_subtitle') }}
            </p>
            <span class="section-line mx-auto mt-4" style="width:60px;"></span>
        </div>

        {{-- Category filter tabs --}}
        <div id="filter-tabs-wrapper" class="relative flex flex-wrap justify-center gap-2 mb-12 reveal-up">
            {{-- Sliding pill indicator (positioned by GSAP) --}}
            <div id="filter-pill"></div>

            <button
                @click="portfolioFilter('all', $event)"
                :class="selectedTab === 'all' ? 'filter-tab active' : 'filter-tab'"
                class="filter-tab"
                data-tab="all"
            >
                {{ __('home.portfolio_tab_all') }}
            </button>

            @foreach($tabs as $tab)
                <button
                    @click="portfolioFilter('{{ $tab }}', $event)"
                    :class="selectedTab === '{{ $tab }}' ? 'filter-tab active' : 'filter-tab'"
                    class="filter-tab"
                    data-tab="{{ $tab }}"
                >
                    {{ $tab }}
                </button>
            @endforeach
        </div>

        {{-- Cards grid --}}
        <div class="stagger-parent grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            @foreach($items as $item)
                <x-portfolio-item
                    :title="$item->title"
                    :categories="$item->categories->pluck('name')->toArray()"
                    :image="$item->image"
                    :github="$item->github ?? '#'"
                ></x-portfolio-item>
            @endforeach
        </div>

    </div>
</section>
