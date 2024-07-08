import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,

    output: "server",
    adapter: node({
        mode: "standalone",
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
        locales: ["vi"],
    },

    redirects: {
        "/privacy": "/legal/privacy",
        "/terms": "/legal/terms",
        "/signout": "/api/auth/signout",
        "/dashboard/accounts": "/dashboard/accounts/1",
    },

    integrations: [tailwind(), react(), sitemap()],
});
