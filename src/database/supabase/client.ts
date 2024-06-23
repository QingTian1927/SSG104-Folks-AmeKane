import { createClient } from "@supabase/supabase-js";
import { type Database } from "../database.types";
import { ERROR_MESSAGES,errorResponse,type ID } from "../models";

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

export async function CalMonOfAccount(userId: ID) {
    if (!userId) {
        return errorResponse(userId, ERROR_MESSAGES.UNDEFINED_USER_ID);
    }
    const { data: balAcc } = await supabase.from("Account").select().eq("user_id", userId);
    let length = balAcc?.length;
    let sum = 0;
    for (let index = 0; index < length; index++) {
        const element = balAcc[index];
        if (element.is_saving) {
            sum += element.balance;
        } else {
            sum -= element.balance;
        }   
    }
    return sum;
}

export async function TinhChiTieuTransaction(accountId: string) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    const { data: TranAcc } = await supabase.from("Transaction").select().eq("account_id", accountId);
    let length = TranAcc?.length;
    let sum = 0;
    for (let index = 0; index < length; index++) {
        const element = TranAcc[index];
        if (!element.is_income) {
            sum += element.value;
        }
    }
    return sum;
}

export async function TinhThuNhapTransaction(accountId: string) {
    if (!accountId) {
        return errorResponse(accountId, ERROR_MESSAGES.UNDEFINED_ACCOUNT_ID);
    }
    const { data: TranAcc } = await supabase
        .from("Transaction")
        .select()
        .eq("account_id", accountId);
    let length = TranAcc?.length;
    let sum = 0;
    for (let index = 0; index < length; index++) {
        const element = TranAcc[index];
        if (element.is_income) {
            sum += element.value;
        }
    }
    return sum;
}
