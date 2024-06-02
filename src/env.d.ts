/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly SITE_URL: string,

    readonly SUPABASE_URL: string,
    readonly SUPABASE_ANON_KEY: string,

    readonly GOOGLE_CLIENT_ID: string,
    readonly GOOGLE_SECRET: string,

    readonly FACEBOOK_CLIENT_ID: string,
    readonly FACEBOOK_SECRET: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
