/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'antd-lg': '1200px',
      },
    },
    fontFamily: {
      IBMPlexSansThaiThin: ['IBMPlexSansThai-Thin', ...defaultTheme.fontFamily.sans],
      IBMPlexSansThaiLight: ['IBMPlexSansThai-Light', ...defaultTheme.fontFamily.sans],
      IBMPlexSansThaiExtraLight: ['IBMPlexSansThai-ExtraLight', ...defaultTheme.fontFamily.sans],
      IBMPlexSansThaiMedium: ['IBMPlexSansThai-Medium', ...defaultTheme.fontFamily.sans],
      IBMPlexSansThaiRegular: ['IBMPlexSansThai-Regular', ...defaultTheme.fontFamily.sans],
      IBMPlexSansThaiSemiBold: ['IBMPlexSansThai-SemiBold', ...defaultTheme.fontFamily.sans],
      IBMPlexSansThaiBold: ['IBMPlexSansThai-Bold', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
