<!doctype html>
<html class="dark" lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ __('home.meta_description', ['name' => config('portfolio.owner.name')]) }}">
    <title>{{ __('home.page_title', ['name' => config('portfolio.owner.name')]) }}</title>
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"></script>
</head>
<body class="bg-[#020617] text-slate-200 overflow-x-hidden">

    {{-- Global noise grain overlay for depth/texture --}}
    <div class="hero-grain fixed inset-0 pointer-events-none z-0 opacity-30"></div>

    <x-layout.navbar></x-layout.navbar>

    <main>
        {{ $slot }}
    </main>

    <x-layout.footer></x-layout.footer>

</body>
</html>
