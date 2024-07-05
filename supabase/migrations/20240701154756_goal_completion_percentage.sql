create
or replace function get_goal_progress (query_user_id uuid) returns table (
    goal_id uuid,
    goal_title text,
    goal_target double precision,
    goal_current double precision,
    progress integer
) language plpgsql as $$
    begin
        return query
        select
            goal.id as goal_id,
            goal.title as goal_title,
            goal.target as goal_target,
            goal.current as goal_current,
            (
                select
                cast ((goal.current / goal.target * 100) as integer)
            ) as progress
        from
            public."Goal" goal
        where
            goal.user_id = query_user_id
            and goal.target > 0
            and cast ((goal.current / goal.target * 100) as integer) < 100
        group by goal.id
        order by progress desc;
    end
$$;
