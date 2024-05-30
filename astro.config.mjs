import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,

    output: "server",
    adapter: node({
        mode: "standalone"
    }),

    build: {
        server: "./dist/server",
        serverEntry: "entry.mjs",
    },

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
