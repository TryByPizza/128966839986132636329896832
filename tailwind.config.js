/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // Add pages directory if you want to include it
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'], // Adding Orbitron font
      },
      screens: {
        'lg-custom': '1124px', // Add custom breakpoint
      },
    },
  },
  plugins: [],
}
