<section id="videogame" class="videogame-section relative overflow-hidden">

  {{-- Fireworks + pixel stars canvas background --}}
  <canvas id="vg-fireworks-canvas"
          class="absolute inset-0 w-full h-full"
          style="z-index:0; pointer-events:none;"></canvas>

  {{-- SVG squiggles interactive background (disabled) --}}
  <svg id="vg-squiggles-stage"
       class="absolute inset-0 w-full h-full"
       xmlns="http://www.w3.org/2000/svg"
       style="z-index:0; pointer-events:none; display:none;"></svg>

  {{-- CRT scanlines overlay --}}
  <div class="vg-scanlines pointer-events-none absolute inset-0" style="z-index:1;"></div>

  {{-- Section content --}}
  <div class="container relative" style="z-index:2; padding-top: 6rem; padding-bottom: 6rem;">

    {{-- Top label --}}
    <div class="text-center mb-16">
      <span class="vg-label">{{ __('home.vg_label') }}</span>
      <h2 class="vg-title vg-animate-in" data-vg-stagger="0">
        THE DEVELOPER'S<br><span style="color:#00d4ff;">JOURNEY</span>
      </h2>
      <p class="vg-subtitle vg-animate-in" data-vg-stagger="1">
        {{ __('home.vg_subtitle') }}
      </p>
    </div>

    {{-- Main grid --}}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">

      {{-- LEFT: Story --}}
      <div class="vg-animate-in" data-vg-stagger="2">

        <h3 class="vg-heading mb-5">{{ __('home.vg_why_heading') }}</h3>

        <p class="vg-text mb-5">
          {!! __('home.vg_why_p1') !!}
        </p>

        <p class="vg-text mb-5">
          {!! __('home.vg_why_p2') !!}
        </p>

        {{-- Emotional highlight quote --}}
        <blockquote class="vg-quote vg-animate-in mb-8" data-vg-stagger="3">
          {!! __('home.vg_quote') !!}
        </blockquote>

        {{-- Tech stack pixel badges --}}
        <h3 class="vg-heading mt-10 mb-4">{{ __('home.vg_stack_heading') }}</h3>
        <div class="flex flex-wrap gap-3 mb-8">
          @php
            $vgStack = [
              ['name' => 'Phaser 3',     'icon' => '🎮', 'color' => '#00d4ff'],
              ['name' => 'Svelte',       'icon' => '🔥', 'color' => '#ff6b35'],
              ['name' => 'JavaScript',   'icon' => '⚡', 'color' => '#f7df1e'],
              ['name' => 'Photoshop',    'icon' => '🎨', 'color' => '#31a8ff'],
              ['name' => 'Tiled',        'icon' => '🗺',  'color' => '#39ff14'],
              ['name' => 'State Pattern','icon' => '🧠', 'color' => '#ff0080'],
            ];
          @endphp
          @foreach($vgStack as $tech)
            <span class="vg-badge vg-animate-in" data-vg-stagger="3"
                  style="--badge-color: {{ $tech['color'] }};">
              {{ $tech['icon'] }} {{ $tech['name'] }}
            </span>
          @endforeach
        </div>

        {{-- Game description --}}
        <h3 class="vg-heading mb-4">{{ __('home.vg_about_game_heading') }}</h3>
        <p class="vg-text vg-animate-in" data-vg-stagger="4">
          {!! __('home.vg_about_game_text') !!}
        </p>
      </div>

      {{-- RIGHT: Real screenshots --}}
      <div class="vg-animate-in" data-vg-stagger="2">
        <h3 class="vg-heading mb-6">{{ __('home.vg_action_heading') }}</h3>

        {{-- Screenshot gallery in screen frame --}}
        <div class="vg-screen" id="vg-gallery">
          <div class="vg-screen-header">
            <span class="vg-screen-dot" style="background:#ff5f57;"></span>
            <span class="vg-screen-dot" style="background:#febc2e;"></span>
            <span class="vg-screen-dot" style="background:#28c840;"></span>
            <span class="vg-screen-title">THE DEVELOPER'S JOURNEY v1.0</span>
          </div>
          <div class="vg-screen-body vg-gallery-body">
            @php
              $screenshots = [
                ['src' => '/img/videogame/videogame_start.png',       'alt' => __('home.vg_screenshot_start_alt')],
                ['src' => '/img/videogame/videogame_snow.png',         'alt' => __('home.vg_screenshot_snow_alt')],
                ['src' => '/img/videogame/videogame_certificates.png', 'alt' => __('home.vg_screenshot_certificates_alt')],
              ];
            @endphp
            @foreach($screenshots as $i => $shot)
              <img
                src="{{ url($shot['src']) }}"
                alt="{{ $shot['alt'] }}"
                class="vg-screenshot{{ $i === 0 ? ' vg-screenshot--active' : '' }}"
                data-index="{{ $i }}"
              />
            @endforeach
          </div>
          <div class="vg-gallery-nav">
            @foreach($screenshots as $i => $shot)
              <button
                class="vg-gallery-dot{{ $i === 0 ? ' vg-gallery-dot--active' : '' }}"
                data-target="{{ $i }}"
                aria-label="{{ __('home.vg_gallery_dot_aria', ['number' => $i + 1]) }}"
              ></button>
            @endforeach
          </div>
        </div>

        {{-- CTA below the gallery --}}
        <div class="text-center vg-animate-in mt-8" data-vg-stagger="6">
          <p class="vg-text mb-6" style="opacity:0.7;">{{ __('home.vg_ready_to_play') }}</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://portfolio-videogame.vercel.app/"
               target="_blank"
               class="vg-cta-btn"
               rel="noopener noreferrer">
              {{ __('home.vg_play_btn') }}
            </a>
            <a href="https://github.com/SamFabra570/CozyWinterJam2026"
               target="_blank"
               class="vg-cta-btn vg-cta-btn--github"
               rel="noopener noreferrer">
              {{ __('home.vg_github_btn') }}
            </a>
          </div>
          <p class="vg-tiny-text mt-4">{{ __('home.vg_keyboard_note') }}</p>
        </div>
      </div>

    </div>

  </div>

  {{-- Pixel art scroll indicator --}}
  <div class="vg-scroll-indicator" id="vg-scroll-indicator">
    <div class="vg-mouse-pixel"></div>
    <span class="vg-scroll-text">SCROLL</span>
  </div>

</section>
