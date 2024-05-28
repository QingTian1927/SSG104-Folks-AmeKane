create table if not exists public."Category" (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null,

    title text not null,
    description text null default ''::text,

    spending_limit double precision not null default '0'::double precision,
    is_necessity boolean not null default false,
    this_color public."Color" not null default 'blue'::"Color",

    constraint Category_pkey primary key (id),

    constraint Category_user_id_fkey foreign key (user_id)
    references auth.users (id) on update cascade on delete cascade
) tablespace pg_default;

create policy "Users can only view their own categories"
on public."Category" for select
using ( (select auth.uid() as uid) = user_id );

alter table public."Category" enable row level security;
