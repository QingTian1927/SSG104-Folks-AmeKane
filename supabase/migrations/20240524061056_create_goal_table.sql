create table if not exists public."Goal" (
    id uuid not null default gen_random_uuid(),
    profile_id uuid not null,

    target double precision not null,
    current double precision not null,

    title text not null,
    description text null,

    constraint Goal_pkey primary key (id),
    constraint Goal_profile_id_fkey foreign key (profile_id)
    references public."Profile" (id) on update cascade on delete cascade
) tablespace pg_default;

create policy "Users can only view their own goals"
on public."Goal" for select
using ( (select id from public."Profile") = profile_id );

alter table public."Goal" enable row level security;
