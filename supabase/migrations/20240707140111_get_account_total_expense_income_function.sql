create or replace function get_account_total_expense(query_account_id uuid)
returns double precision
language plpgsql
as $$
    begin
        return (
            select sum (value) from public."Transaction"
            where account_id = query_account_id and is_income = false
        );
    end
$$;

create or replace function get_account_total_income(query_account_id uuid)
returns double precision
language plpgsql
as $$
    begin
        return (
            select sum (value) from public."Transaction"
            where account_id = query_account_id and is_income = true
        );
    end
$$;
