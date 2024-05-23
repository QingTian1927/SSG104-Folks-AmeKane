do $$
begin
    if not exists (select 1 from pg_type where typname = 'Color') then
        create type public."Color" as enum (
            'black',
            'white',
            'blue',
            'red',
            'green',
            'yellow',
            'orange',
            'purple',
            'pink',
            'brown',
            'gray'
        );
    end if;
end$$
