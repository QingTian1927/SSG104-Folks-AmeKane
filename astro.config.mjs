import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    adapter: node({
        mode: "standalone"
    }),

    server: {
        host: true,
        port: 6969,
    },

    i18n: {
        defaultLocale: "vi",
    },

    integrations: [
        tailwind(),
        react()
    ],
});