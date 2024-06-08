/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            fontFamily: {
                "sans": ['"Montserrat"', ...defaultTheme.fontFamily.sans],
            },
        },
	},
	plugins: [
        require("@tailwindcss/typography"),
    ],
}
