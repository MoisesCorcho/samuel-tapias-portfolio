/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    safelist: [
        // Alpine.js dynamic filter-tab classes
        'filter-tab',
        'active',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
            },
            colors: {
                amber: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [require("tailgrids/plugin")],
}
