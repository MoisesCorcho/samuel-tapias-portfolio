@php
$experience = __('home.experience_jobs');
$companyLogos = [
    'DVLOPER'                            => 'dvloper_logo.png',
    'Imagine Apps'                       => 'imagineappsas_logo.jpeg',
    'Universidad Cooperativa de Colombia'=> 'ucc_logo.jpeg',
    'DISTRACOM'                          => 'distracom_logo.jpeg',
    'andrestelocambia'                   => 'andrestelocambia_logo.jpeg',
];
@endphp

{{-- ====== Experience Section ====== --}}
<section id="experience" class="exp-section relative overflow-hidden pt-24">

    {{-- Parallax bg text --}}
    <div class="bg-text" style="top: 50%; left: 50%; transform: translate(-50%, -50%);" data-parallax-bg>{{ __('home.experience_parallax_bg') }}</div>

    {{-- Stars background — 3 layers (sm/md/lg) animated via JS box-shadow --}}
    <div class="exp-stars" aria-hidden="true">
        <div class="exp-stars__layer exp-stars__sm" id="exp-stars-sm"></div>
        <div class="exp-stars__layer exp-stars__md" id="exp-stars-md"></div>
        <div class="exp-stars__layer exp-stars__lg" id="exp-stars-lg"></div>
    </div>
    <div class="exp-vignette" aria-hidden="true"></div>

    {{-- Section header --}}
    <div class="container relative z-10 mb-12">
        <div class="text-center reveal-up">
            <span class="section-label justify-center" data-scramble data-original="{{ __('home.experience_label') }}">{{ __('home.experience_label') }}</span>
            <h2 class="heading-glow font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 mb-4"
                style="font-family:var(--font-display); overflow:hidden;"
                data-clip-reveal>
                {{ __('home.experience_heading') }} <span class="gradient-text-static">{{ __('home.experience_heading_accent') }}</span>
            </h2>
            <span class="section-line mx-auto" style="width:60px;"></span>
        </div>
    </div>

    {{-- Expandable experience cards --}}
    <div class="exp-options relative z-10">
        @foreach($experience as $i => $job)
        <div class="exp-option {{ $i === 0 ? 'active' : '' }}" data-exp-index="{{ $i }}">
            <div class="exp-shadow"></div>

            {{-- Vertical company name — visible only when collapsed --}}
            <div class="exp-vertical-label">{{ $job['company'] }}</div>

            {{-- Full content — visible when expanded --}}
            <div class="exp-content">
                <h3 class="exp-role">{{ $job['role'] }}</h3>
                <div class="exp-company-row">
                    <span class="exp-company">{{ $job['company'] }}</span>
                    <span class="exp-date">{{ $job['date'] }}</span>
                </div>
                {{-- Scrollable description area --}}
                <div class="exp-desc-wrap">
                    <div class="exp-desc-inner">{!! $job['description'] !!}</div>
                </div>
                {{-- Stack always pinned at bottom --}}
                <div class="exp-stack">
                    @foreach($job['stack'] as $tech)
                        <span class="exp-tag">{{ $tech }}</span>
                    @endforeach
                </div>
            </div>

            {{-- Label — company logo / initial + role + company --}}
            <div class="exp-label">
                <div class="exp-icon">
                    @if(isset($companyLogos[$job['company']]))
                        <img src="{{ asset('img/company_logos/' . $companyLogos[$job['company']]) }}"
                             alt="{{ $job['company'] }}"
                             class="exp-icon__img">
                    @else
                        {{ strtoupper(mb_substr($job['company'], 0, 1)) }}
                    @endif
                </div>
                <div class="exp-info">
                    <div class="exp-info__main">{{ $job['role'] }}</div>
                    <div class="exp-info__sub">{{ $job['company'] }}</div>
                </div>
            </div>
        </div>
        @endforeach
    </div>

</section>
