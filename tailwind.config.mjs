/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
            },
        },
        screens: {
            "2xs": "360px",
            "xs": "480px",
            ...defaultTheme.screens,
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
};
