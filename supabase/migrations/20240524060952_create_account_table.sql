create table if not exists public."Account" (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null,

    title text not null default 'Tài Khoản Của Tôi'::text,
    balance double precision not null default '0'::double precision,
    is_saving boolean not null default false,

    constraint Account_pkey primary key (id),

    constraint Account_user_id_fkey foreign key (user_id)
    references auth.users (id) on update cascade on delete cascade
) tablespace pg_default;

create policy "Users can only view their own accounts"
on public."Account" for select
using ( (select auth.uid() as uid) = user_id );

alter table public."Account" enable row level security;
