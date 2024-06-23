create or replace function get_total_balance(query_user_id uuid)
returns double precision
language plpgsql
as $$
    begin
        return (
            select sum (balance) from public."Account"
            where user_id = query_user_id
        );
    end
$$;

create or replace function get_total_income(query_user_id uuid)
returns double precision
language plpgsql
as $$
    begin
        return (
            select sum (value) from public."Transaction"
            where (user_id = query_user_id and is_income = true)
        );
    end
$$;

create or replace function get_total_expense(query_user_id uuid)
returns double precision
language plpgsql
as $$
    begin
        return (
            select sum (value) from public."Transaction"
            where (user_id = query_user_id and is_income = false)
        );
    end
$$;
