import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: node({
        mode: "standalone"
    }),

    site: "https://fundrella.onrender.com",
    server: {
        host: true,
        port: 6969,
    },

    i18n: {
        defaultLocale: "vi",
        locales: [
            "vi",
        ]
    },

    integrations: [
        tailwind(),
        react()
    ],
});
