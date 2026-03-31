{{-- ====== About Section ====== --}}
<section
    id="about"
    class="relative pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden"
    style="background: linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%);"
>
    {{-- Squiggles interactive SVG background --}}
    <svg id="about-squiggles-stage"
         class="absolute inset-0 w-full h-full"
         xmlns="http://www.w3.org/2000/svg"
         style="z-index:0; pointer-events:none;"></svg>

    {{-- Noise circles container (JS populates this) --}}
    <div id="noise-circles" class="absolute inset-0 pointer-events-none" style="z-index:1; overflow:hidden;"></div>

    {{-- Decorative oversized bg text (parallax via JS) --}}
    <div class="bg-text" style="top: 50%; left: 50%; transform: translate(-50%, -50%);" data-parallax-bg>{{ __('home.about_parallax_bg') }}</div>

    {{-- Background orb --}}
    <div style="position:absolute; width:600px; height:600px; background:rgba(245,158,11,0.05); top:50%; right:-200px; transform:translateY(-50%); border-radius:50%; filter:blur(100px); pointer-events:none;"></div>

    <div class="container relative z-10">

        {{-- Section header --}}
        <div class="text-center mb-16 reveal-up">
            <span class="section-label justify-center" data-scramble data-original="{{ __('home.about_label') }}">{{ __('home.about_label') }}</span>
            <h2 class="heading-glow font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 mb-4"
                style="font-family:var(--font-display); overflow:hidden;"
                data-clip-reveal>
                {{ __('home.about_heading') }}
                <span class="gradient-text-static">{{ __('home.about_heading_accent') }}</span>
            </h2>
            <span class="section-line mx-auto" style="width:60px;"></span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {{-- ── LEFT: Images grid ── --}}
            <div class="about-images-grid relative">
                <div class="grid grid-cols-2 gap-4">
                    {{-- Column A --}}
                    <div class="flex flex-col gap-4 pt-8">
                        <div class="about-img-item rounded-2xl overflow-hidden"
                             style="border:1px solid rgba(255,255,255,0.06);">
                            <img
                                src="{{ url('/img/dog_1.jpeg') }}"
                                alt="{{ __('home.about_img_1_alt') }}"
                                class="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div class="about-img-item rounded-2xl overflow-hidden"
                             style="border:1px solid rgba(255,255,255,0.06);">
                            <img
                                src="{{ url('/img/dog_2.png') }}"
                                alt="{{ __('home.about_img_2_alt') }}"
                                class="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                    {{-- Column B --}}
                    <div class="flex flex-col gap-4">
                        <div class="about-img-item rounded-2xl overflow-hidden"
                             style="border:1px solid rgba(245,158,11,0.2); height:100%;">
                            <img
                                src="{{ url('/img/samuel_2.jpeg') }}"
                                alt="{{ __('home.about_img_3_alt') }}"
                                class="w-full h-full object-cover min-h-[250px] transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {{-- ── RIGHT: Text Content ── --}}
            <div class="reveal-right">

                {{-- Quote card --}}
                <div class="quote-card mb-8">
                    <p id="about-quote-text" class="text-slate-300 text-base leading-relaxed">
                        {{ __('home.about_quote') }}
                    </p>
                </div>

                <p class="text-slate-400 leading-relaxed mb-5" style="font-size:0.95rem; font-family:var(--font-body);">
                    {!! __('home.about_para_1') !!}
                </p>

                <p class="text-slate-400 leading-relaxed mb-8" style="font-size:0.95rem; font-family:var(--font-body);">
                    {!! __('home.about_para_2') !!}
                </p>

                {{-- Stack técnico — cycling animation --}}
                <div class="mb-8">
                    <p class="section-label mb-5">{{ __('home.about_stack_label') }}</p>
                    <div class="about-tech-cycling">
                        <div class="about-tech-cycling__row">
                            <span class="about-tech-cycling__static">{{ __('home.about_stack_prefix') }}</span>
                            <span class="about-tech-cycling__brace" aria-hidden="true">[</span>
                            <div class="about-tech-cycling__window">
                                <ul class="about-tech-cycling__list">
                                    <li class="about-tech-cycling__item">C#</li>
                                    <li class="about-tech-cycling__item">Java</li>
                                    <li class="about-tech-cycling__item">Python</li>
                                    <li class="about-tech-cycling__item">SQL</li>
                                    <li class="about-tech-cycling__item">Unreal</li>
                                    <li class="about-tech-cycling__item">Unity</li>
                                    <li class="about-tech-cycling__item">Azure DevOps</li>
                                    <li class="about-tech-cycling__item">Azure Portal</li>
                                    <li class="about-tech-cycling__item">Terraform</li>
                                </ul>
                            </div>
                            <span class="about-tech-cycling__brace" aria-hidden="true">]</span>
                        </div>
                    </div>
                </div>

<a
                    href="https://github.com/Shmuel97"
                    target="_blank"
                    class="btn-outline inline-flex magnetic"
                >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {{ __('home.about_github_btn') }}
                </a>
            </div>
        </div>
    </div>
</section>
