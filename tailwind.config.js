/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      strokeWidth: {
        '0': '2px',
        '1': '4px',
        '2': '8px'
      }
    },
  },
  plugins: [],
}

