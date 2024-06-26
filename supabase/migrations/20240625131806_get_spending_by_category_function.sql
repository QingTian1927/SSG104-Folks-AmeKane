create or replace function get_category_spending(
    query_user_id uuid
)
returns table (
    category_id uuid,
    money_spent double precision
)
language plpgsql
as $$
    begin
        return query
        select
            category.id as category_id,
            coalesce(sum(transaction.value), 0) as money_spent
        from
            public."Category" category
        left join
            public."Transaction" transaction on category.id = transaction.category_id
        where (
            category.user_id = query_user_id
            and transaction.user_id = query_user_id
            and transaction.is_income = false
        )
        group by category.id
        order by money_spent desc;
    end
$$;

