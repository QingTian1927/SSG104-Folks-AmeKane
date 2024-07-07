create or replace function get_account_expense_ranking(query_user_id uuid)
returns table (
    account_id uuid,
    account_title text,
    account_expense double precision
) language plpgsql as $$
    begin
        return query
        select
            account.id as account_id,
            account.title as account_title,
            (
                select
                    coalesce (sum (value), 0)
                from
                    public."Transaction" transaction
                where
                    account.id = transaction.account_id
                    and transaction.is_income = false
            ) as account_expense
        from
            public."Account" account
        where
            account.user_id = query_user_id
            and account.is_saving = false
        group by account.id
        order by account_expense desc;
    end
$$;
