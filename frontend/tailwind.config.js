/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        haze: "#f8fafc",
        sand: "#f5f0e9",
        accent: "#d97706",
        coral: "#f97316"
      },
      boxShadow: {
        soft: "0 20px 60px -40px rgba(15, 23, 42, 0.7)"
      }
    }
  },
  plugins: []
};
