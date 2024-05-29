do $$
begin
    if not exists (select 1 from pg_type where typname = 'Theme') then
        create type public."Theme" as enum (
            'system',
            'time',
            'light',
            'dark'
        );
    end if;
end$$
