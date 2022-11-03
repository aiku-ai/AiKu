module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  plugins: [
    // require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/typography'),
  ],
}
