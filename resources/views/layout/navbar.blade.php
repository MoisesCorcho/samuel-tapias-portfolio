{{-- ====== Navbar ====== --}}
<header
    x-data="{ navbarOpen: false }"
    class="site-navbar fixed left-0 top-0 z-50 w-full"
    style="background: rgba(2, 6, 23, 0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.06);"
>
    <div class="container">
        <div class="flex items-center justify-between h-16 lg:h-20">

            {{-- Brand --}}
            <a href="/" class="flex items-center gap-2 group">
                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-display font-extrabold text-sm">{{ config('portfolio.owner.brand_initial') }}</span>
                <span class="font-display font-bold text-lg text-slate-100 group-hover:text-amber-400 transition-colors duration-200">{{ config('portfolio.owner.brand_name') }}<span class="text-amber-400">.</span></span>
            </a>

            {{-- Desktop nav --}}
            <nav class="hidden lg:flex items-center gap-1">
                @foreach($navigationItems as $item)
                    <a href="{{ $item['href'] }}" class="nav-link px-4 py-2 rounded-lg transition-colors duration-200">
                        {{ $item['label'] }}
                    </a>
                @endforeach
            </nav>

            {{-- Desktop CTA + Lang switcher --}}
            <div class="hidden lg:flex items-center gap-4">
                <a href="{{ route('lang.switch', app()->getLocale() === 'es' ? 'en' : 'es') }}"
                   class="lang-switcher"
                   title="{{ app()->getLocale() === 'es' ? __('home.nav_lang_switch_title_to_en') : __('home.nav_lang_switch_title_to_es') }}">
                    {{ app()->getLocale() === 'es' ? 'EN' : 'ES' }}
                </a>
                <a href="#contact" class="btn-primary text-sm px-5 py-2 magnetic">
                    {{ __('home.nav_cta') }}
                </a>
            </div>

            {{-- Hamburger --}}
            <button
                @click="navbarOpen = !navbarOpen"
                :class="navbarOpen && 'navbarTogglerActive'"
                class="relative lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] focus:outline-none z-50"
                aria-label="Toggle menu"
            >
                <span class="relative w-6 h-[2px] bg-slate-300 transition-all duration-300 block"></span>
                <span class="relative w-6 h-[2px] bg-slate-300 transition-all duration-300 block"></span>
                <span class="relative w-6 h-[2px] bg-slate-300 transition-all duration-300 block"></span>
            </button>
        </div>
    </div>

    {{-- Mobile menu --}}
    <div
        x-show="navbarOpen"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 -translate-y-2"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 -translate-y-2"
        class="lg:hidden border-t border-white/5"
        style="background: rgba(2, 6, 23, 0.96);"
    >
        <nav class="container py-4 flex flex-col gap-1">
            @foreach($navigationItems as $item)
                <a
                    href="{{ $item['href'] }}"
                    @click="navbarOpen = false"
                    class="nav-link px-4 py-3 rounded-lg text-base hover:bg-white/5"
                >
                    {{ $item['label'] }}
                </a>
            @endforeach
            <a href="{{ route('lang.switch', app()->getLocale() === 'es' ? 'en' : 'es') }}"
               class="lang-switcher mt-3 justify-center self-start"
               title="{{ app()->getLocale() === 'es' ? __('home.nav_lang_switch_title_to_en') : __('home.nav_lang_switch_title_to_es') }}">
                {{ app()->getLocale() === 'es' ? 'EN' : 'ES' }}
            </a>
            <a href="#contact" class="btn-primary mt-3 justify-center">{{ __('home.nav_cta') }}</a>
        </nav>
    </div>
</header>
