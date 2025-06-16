/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gemini-blue': '#4285f4',
        'gemini-dark': '#1a1a1a',
        'gemini-gray': '#f8f9fa',
        'gemini-border': '#e8eaed'
      }
    },
  },
  plugins: [],
} 