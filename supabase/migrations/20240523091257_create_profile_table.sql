create table if not exists public."Profile" (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null,
    display_name text null default ''::text,

    default_account uuid null,
    currency character varying default 'đ'::character varying,
    created_at timestamp with time zone default now() not null,

    unique (user_id),
    constraint profile_pkey primary key (id),

    constraint profile_user_id_fkey foreign key (user_id)
    references auth.users (id) on update cascade on delete cascade
);

create policy "Users can only view their own profile"
on public."Profile" for select
using ((( select auth.uid() as uid) = user_id));

alter table public."Profile" enable row level security;
