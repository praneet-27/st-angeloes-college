/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'royal-blue': '#1a3e72',
        'white': '#ffffff',
        'gold': '#d4af37',
        primary: "#6B21A8", // Purple (keeping original)
        "background-light": "#f5f3f7",
        "background-dark": "#1a161e",
      },
      fontFamily: {
        display: ["Work Sans", "Poppins", "Roboto", "Open Sans", "sans-serif"],
      },
      borderRadius: { 
        DEFAULT: "0.25rem", 
        lg: "0.5rem", 
        xl: "0.75rem", 
        full: "9999px" 
      },
    },
  },
  plugins: [],
}
