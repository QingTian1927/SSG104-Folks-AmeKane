create or replace function get_goal_progress(
    query_user_id uuid
)
returns table (
    goal_id uuid,
    goal_title text,
    goal_target double precision,
    goal_current double precision,
    progress integer
)
language plpgsql
as $$
    begin
        return query
        select
            goal.id as goal_id,
            goal.title as goal_title,
            goal.target as goal_target,
            goal.current as goal_current,
            (
                select
                cast
                (
                    (select current from public."Goal" where id = goal.id) /
                    (select target from public."Goal" where id = goal.id) * 100
                    as integer
                )
            ) as progress
        from
            public."Goal" goal
        where
            goal.user_id = query_user_id
        group by goal.id
        order by progress desc;
    end
$$;
