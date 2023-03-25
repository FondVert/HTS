/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_green: '#10542a',
        green: '#aed628',
        brown: '#714a2e',
        black: '#190d0a',
      },
    }
  },
  plugins: [],
}
