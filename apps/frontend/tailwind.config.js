/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      sherif: ['"Philosopher"', "serif"],
      sans: ['"Roboto"', "sans-serif"],
    },
    extend: {
      colors: {
        "black-600": "#090909",
        "blue-600": "#122952",
        "blue-700": "#0B39DC",
        "blue-dark": "#213F74",
        "b-gray": "#434343",
        "gray-200": "#F3F5F7",
        "gray-500": "#E5E9EC",
      },
    },
  },
  plugins: [],
};
