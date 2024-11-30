/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bb: "var(--backG)",
        txtColor: "var(--txtColor)",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

