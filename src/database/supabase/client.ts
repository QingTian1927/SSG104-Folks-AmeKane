import { createClient } from "@supabase/supabase-js";
import { type Database } from "../database.types";

export const supabase = createClient<Database>(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY,
    {
        auth: {
            flowType: "pkce",
        },
    },
);

export const supabaseElevated = createClient<Database>(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_KEY,
    {
        auth: {
            flowType: "pkce",
        },
    },
);
