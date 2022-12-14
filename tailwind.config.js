/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#5775f8",
        
"secondary": "#152747",
        
"accent": "#513448",
        
"neutral": "#171618",
        
"base-100": "#f3f4f6",
        
"info": "#66C7FF",
        
"success": "#87D039",
        
"warning": "#E3D664",
        
"error": "#FF7070",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
