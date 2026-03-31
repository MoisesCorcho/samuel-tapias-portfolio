{{-- ====== Hero Section ====== --}}
<section
    id="hero-section"
    class="relative min-h-screen flex items-center overflow-hidden"
    style="background: linear-gradient(135deg, #020617 0%, #0f172a 60%, #020617 100%);"
>
    {{-- Particle network canvas (interactive background, sits behind everything) --}}
    <canvas id="hero-bg-canvas" class="absolute inset-0 w-full h-full" style="z-index:0; pointer-events:none;"></canvas>

    {{-- Ambient glow orbs --}}
    <div class="hero-orb" style="position:absolute; width:500px; height:500px; background:rgba(245,158,11,0.06); top:-100px; left:-150px; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1;"></div>
    <div class="hero-orb" style="position:absolute; width:400px; height:400px; background:rgba(251,146,60,0.05); bottom:-80px; right:10%; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:1;"></div>

    {{-- Decorative wave at bottom --}}
    <div class="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden" style="z-index:1;">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-24 opacity-10">
            <path d="M0,80 C360,20 720,120 1440,40 L1440,120 L0,120 Z" fill="url(#heroWave)"/>
            <defs>
                <linearGradient id="heroWave" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#fb923c"/>
                </linearGradient>
            </defs>
        </svg>
    </div>

    <div class="container relative pt-28 lg:pt-32 pb-20" style="z-index:2;">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {{-- ── LEFT: Text Content ── --}}
            <div class="flex flex-col">

                {{-- Availability badge --}}
                <div class="hero-badge inline-flex items-center gap-2 mb-6 self-start px-4 py-1.5 rounded-full glass">
                    <span class="flex h-2 w-2 relative">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span style="font-family:var(--font-display);" class="text-xs font-semibold tracking-[0.14em] uppercase text-amber-400/90">
                        {{ __('home.hero_badge') }}
                    </span>
                </div>

                {{-- Main title --}}
                <h1
                    class="hero-title font-display font-bold leading-[1.05] text-slate-300 mb-1"
                    style="font-family:var(--font-display); font-size:clamp(2.2rem, 5vw, 3.5rem);"
                >
                    {{ __('home.hero_greeting') }}
                </h1>

                {{-- Name with gradient --}}
                <h1
                    class="hero-name font-display font-extrabold leading-[1.0] mb-5"
                    style="font-family:var(--font-display); font-size:clamp(2.5rem, 6vw, 4rem);"
                >
                    <span class="hero-name-word" data-content="Samuel">Samuel</span>
                    <span class="hero-name-word" data-content="Tapias.">Tapias.</span>
                </h1>

                {{-- Amber line accent --}}
                <span class="section-line mb-8" style="width:80px;"></span>

                {{-- Subtitle --}}
                <p class="hero-subtitle text-slate-400 max-w-[480px] leading-relaxed mb-8" style="font-size:1.05rem; font-family:var(--font-body);">
                    {!! __('home.hero_subtitle') !!}
                </p>

                {{-- CTA buttons --}}
                <div class="hero-cta flex flex-wrap items-center gap-4 mb-10">
                    <a href="#portfolio" class="btn-primary magnetic">
                        {{ __('home.hero_cta_primary') }}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                    </a>
                    <a href="#about" class="btn-outline magnetic">{{ __('home.hero_cta_secondary') }}</a>
                </div>

                {{-- Social icons --}}
                <div class="hero-social">
                    <p style="font-family:var(--font-display);" class="text-xs font-semibold tracking-[0.12em] uppercase text-slate-500 mb-3">
                        {{ __('home.hero_social_label') }}
                    </p>
                    <x-social-icons></x-social-icons>
                </div>
            </div>

            {{-- ── RIGHT: Profile photo (all screen sizes) ── --}}
            <div class="hero-photo-container flex items-center justify-center relative">

                {{-- Amber glow aura --}}
                <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%);"></div>

                <div class="relative">
                    {{-- Photo frame --}}
                    <div class="relative rounded-2xl overflow-hidden"
                         style="width: clamp(220px, 36vw, 400px);
                                border: 1px solid rgba(245,158,11,0.25);
                                box-shadow: 0 0 50px rgba(245,158,11,0.12), 0 20px 60px rgba(0,0,0,0.5);">
                        <img
                            src="{{ url('/img/samuel_1.jpeg') }}"
                            alt="{{ __('home.hero_photo_alt') }}"
                            class="w-full block object-cover"
                            style="aspect-ratio: 4/5; object-position: top;"
                        />
                        {{-- Bottom fade gradient --}}
                        <div style="position:absolute; bottom:0; left:0; right:0; height:30%;
                                    background: linear-gradient(to top, rgba(2,6,23,0.6), transparent);
                                    pointer-events:none;"></div>
                    </div>

                    {{-- Amber corner brackets --}}
                    <span class="absolute -top-2 -left-2 w-6 h-6 pointer-events-none"
                          style="border-top:2px solid rgba(245,158,11,0.7); border-left:2px solid rgba(245,158,11,0.7); border-radius:4px 0 0 0;"></span>
                    <span class="absolute -bottom-2 -right-2 w-6 h-6 pointer-events-none"
                          style="border-bottom:2px solid rgba(245,158,11,0.7); border-right:2px solid rgba(245,158,11,0.7); border-radius:0 0 4px 0;"></span>

                    {{-- Tech badges (desktop) --}}
                    <div class="absolute -bottom-2 -left-5 hidden lg:flex flex-col gap-2">
                        @php $techStack = ['Laravel', 'PHP', 'MySQL', 'Docker']; @endphp
                        @foreach($techStack as $tech)
                            <span class="tech-badge skill-tag">{{ $tech }}</span>
                        @endforeach
                    </div>
                </div>
            </div>

        </div>
    </div>


</section>
