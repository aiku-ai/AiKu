/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  safelist: [
    {
      pattern: /text-violet-./,
      variants: ['sm','md', 'lg', 'xl']
    },
    {
      pattern: /bg-violet-./,
      variants: ['sm','md', 'lg', 'xl']
    },
    {
      pattern: /text-zinc-./,
      variants: ['sm','md', 'lg', 'xl']
    },
    {
      pattern: /bg-zinc-./,
      variants: ['sm','md', 'lg', 'xl']
    },
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/typography'),
  ],
}
