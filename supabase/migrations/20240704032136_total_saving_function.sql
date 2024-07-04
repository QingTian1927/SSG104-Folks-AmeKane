create or replace function get_total_saving(query_user_id uuid)
returns double precision
language plpgsql
as $$
    begin
        return (
            select sum (current) from public."Goal"
            where user_id = query_user_id
        );
    end
$$;
