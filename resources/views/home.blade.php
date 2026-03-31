<x-app-layout>

    <x-home.hero></x-home.hero>
    {{-- Marquee strip --}}
    <div class="marquee-strip overflow-hidden py-3 border-y" style="border-color: rgba(245,158,11,0.15); background: rgba(245,158,11,0.03);">
        <div class="marquee-track flex gap-12 whitespace-nowrap" style="animation: marquee-scroll 25s linear infinite;">
            @php $items = __('home.marquee_items'); @endphp
            @foreach($items as $item)
                <span class="text-xs font-semibold tracking-[0.2em] uppercase" style="font-family:var(--font-display); color: rgba(245,158,11,0.5);">{{ $item }}</span>
                <span style="color: rgba(245,158,11,0.25);">·</span>
            @endforeach
        </div>
    </div>
    {{-- <x-home.learn-php></x-home.learn-php> --}}
    <x-home.about></x-home.about>
    <x-home.portfolio></x-home.portfolio>
    {{-- <x-home.video-tutorials></x-home.video-tutorials> --}}
    <x-home.experience></x-home.experience>
    <x-home.videogame></x-home.videogame>
    <x-home.contact></x-home.contact>

</x-app-layout>
