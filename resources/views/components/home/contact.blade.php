{{-- ====== Contact Section ====== --}}
<section
    id="contact"
    class="relative pt-24 lg:pt-32 pb-24 lg:pb-36 overflow-hidden"
    style="background: linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%);"
>
    {{-- Decorative oversized bg text (parallax via JS) --}}
    <div class="bg-text" style="top: 50%; left: 50%; transform: translate(-50%, -50%);" data-parallax-bg>{{ __('home.contact_parallax_bg') }}</div>

    {{-- Background glow --}}
    <div style="position:absolute; width:600px; height:600px; background:rgba(245,158,11,0.06); bottom:-100px; left:50%; transform:translateX(-50%); border-radius:50%; filter:blur(100px); pointer-events:none;"></div>
    <div class="dot-grid absolute inset-0 opacity-20 pointer-events-none"></div>

    <div class="container relative z-10">

        {{-- Section header --}}
        <div class="text-center mb-16 reveal-up">
            <span class="section-label justify-center" data-scramble data-original="{{ __('home.contact_label') }}">{{ __('home.contact_label') }}</span>
            <h2 class="heading-glow font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-100 mb-4"
                style="font-family:var(--font-display); overflow:hidden;"
                data-clip-reveal>
                {{ __('home.contact_heading') }}
                <span class="gradient-text-static">{{ __('home.contact_heading_accent') }}</span>
            </h2>
            <p class="text-slate-400 max-w-md mx-auto" style="font-family:var(--font-body); font-size:0.95rem;">
                {{ __('home.contact_subtitle') }}
            </p>
            <span class="section-line mx-auto mt-4" style="width:60px;"></span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {{-- ── LEFT: Info panel ── --}}
            <div class="reveal-left">
                <h3 class="font-display font-bold text-2xl text-slate-100 mb-3"
                    style="font-family:var(--font-display);">
                    {{ __('home.contact_left_heading') }}
                </h3>
                <p class="text-slate-400 leading-relaxed mb-8" style="font-family:var(--font-body); font-size:0.95rem;">
                    {{ __('home.contact_left_text') }}
                </p>

                {{-- Contact info items --}}
                <div class="space-y-5 mb-10">
                    {{-- Email --}}
                    <div class="flex items-center gap-4 glass rounded-xl p-4 glass-hover">
                        <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                             style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2);">
                            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs text-slate-500 font-display uppercase tracking-widest mb-0.5"
                               style="font-family:var(--font-display);">{{ __('home.contact_email_label') }}</p>
                            <a href="mailto:{{ config('portfolio.owner.email') }}"
                               class="text-slate-200 hover:text-amber-400 transition-colors duration-200 text-sm font-medium">
                                {{ config('portfolio.owner.email') }}
                            </a>
                        </div>
                    </div>

                    {{-- Location --}}
                    <div class="flex items-center gap-4 glass rounded-xl p-4 glass-hover">
                        <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                             style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.2);">
                            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs text-slate-500 font-display uppercase tracking-widest mb-0.5"
                               style="font-family:var(--font-display);">{{ __('home.contact_location_label') }}</p>
                            <span class="text-slate-200 text-sm font-medium">{{ __('home.contact_location_value') }}</span>
                        </div>
                    </div>
                </div>

                {{-- Social links --}}
                <div>
                    <p class="section-label mb-3">{{ __('home.contact_social_label') }}</p>
                    <x-social-icons></x-social-icons>
                </div>
            </div>

            {{-- ── RIGHT: Form ── --}}
            <div class="reveal-right">
                <div class="glass rounded-2xl p-7 sm:p-9" style="border-color:rgba(255,255,255,0.08);">
                    <form
                        action="/contact/submit"
                        method="POST"
                        x-data="{
                            formData: { name: '', email: '', body: '' },
                            errors: {},
                            successMessage: '',
                            loading: false,

                            submitForm(event) {
                                this.successMessage = '';
                                this.errors = {};
                                this.loading = true;
                                fetch('/contact/submit', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'X-CSRF-TOKEN': document.querySelector('meta[name=\'csrf-token\']').getAttribute('content')
                                    },
                                    body: JSON.stringify(this.formData)
                                })
                                .then((response) => {
                                    if (response.status === 200) return response.json();
                                    throw response;
                                })
                                .then(() => {
                                    this.formData = { name: '', email: '', body: '' };
                                    this.successMessage = @js(__('home.contact_success'));
                                })
                                .catch(async (response) => {
                                    const res = await response.json();
                                    if (response.status === 422) this.errors = res.errors;
                                })
                                .finally(() => { this.loading = false; });
                            }
                        }"
                        x-on:submit.prevent="submitForm"
                    >
                        @csrf

                        {{-- Success message --}}
                        <template x-if="successMessage">
                            <div class="mb-5 px-4 py-3 rounded-xl text-sm font-medium text-emerald-300 flex items-center gap-2"
                                 style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.25);">
                                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span x-text="successMessage"></span>
                            </div>
                        </template>

                        {{-- Name field --}}
                        <div class="mb-5">
                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                                   style="font-family:var(--font-display);">
                                {{ __('home.contact_name_label') }}
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="{{ __('home.contact_name_placeholder') }}"
                                x-model="formData.name"
                                :class="errors.name ? 'form-field error' : 'form-field'"
                            />
                            <template x-if="errors.name">
                                <p x-text="errors.name[0]" class="mt-1.5 text-xs text-red-400"></p>
                            </template>
                        </div>

                        {{-- Email field --}}
                        <div class="mb-5">
                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                                   style="font-family:var(--font-display);">
                                {{ __('home.contact_email_field_label') }}
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="{{ __('home.contact_email_placeholder') }}"
                                x-model="formData.email"
                                :class="errors.email ? 'form-field error' : 'form-field'"
                            />
                            <template x-if="errors.email">
                                <p x-text="errors.email[0]" class="mt-1.5 text-xs text-red-400"></p>
                            </template>
                        </div>

                        {{-- Message field --}}
                        <div class="mb-7">
                            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2"
                                   style="font-family:var(--font-display);">
                                {{ __('home.contact_message_label') }}
                            </label>
                            <textarea
                                name="body"
                                rows="5"
                                placeholder="{{ __('home.contact_message_placeholder') }}"
                                x-model="formData.body"
                                :class="errors.body ? 'form-field error' : 'form-field'"
                                style="resize:none;"
                            ></textarea>
                            <template x-if="errors.body">
                                <p x-text="errors.body[0]" class="mt-1.5 text-xs text-red-400"></p>
                            </template>
                        </div>

                        {{-- Submit button --}}
                        <button
                            type="submit"
                            class="btn-primary w-full justify-center magnetic"
                            :disabled="loading"
                            :class="loading ? 'opacity-70 cursor-not-allowed' : ''"
                        >
                            <template x-if="!loading">
                                <span class="flex items-center gap-2">
                                    {{ __('home.contact_submit_btn') }}
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                    </svg>
                                </span>
                            </template>
                            <template x-if="loading">
                                <span class="flex items-center gap-2">
                                    <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                    {{ __('home.contact_sending') }}
                                </span>
                            </template>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</section>
