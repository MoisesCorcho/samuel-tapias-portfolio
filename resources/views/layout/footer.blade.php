{{-- ====== Footer ====== --}}
<footer class="relative pt-12 pb-8 overflow-hidden" style="background:#020617; border-top:1px solid rgba(255,255,255,0.06);">

    {{-- Top accent line --}}
    <div class="absolute top-0 left-0 right-0 h-px"
         style="background:linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent);"></div>

    <div class="container relative z-10">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">

            {{-- Brand --}}
            <div class="flex items-center gap-2">
                <span class="flex items-center justify-center w-7 h-7 rounded-md text-slate-950 font-display font-extrabold text-sm"
                      style="background:var(--amber); font-family:var(--font-display);">{{ config('portfolio.owner.brand_initial') }}</span>
                <span class="font-display font-bold text-base text-slate-300" style="font-family:var(--font-display);">
                    {{ config('portfolio.owner.brand_name') }}<span class="text-amber-400">.</span>
                </span>
            </div>

            {{-- Social icons --}}
            <x-social-icons class="mb-0"></x-social-icons>

            {{-- Copyright --}}
            <p class="text-xs text-slate-600" style="font-family:var(--font-display);">
                {{ __('home.footer_made_with', ['year' => date('Y'), 'name' => config('portfolio.owner.name')]) }}
            </p>

        </div>
    </div>
</footer>
