create table if not exists public."Preferences" (
    user_id uuid not null,
    default_account uuid null,
    currency character varying not null default 'đ'::character varying,

    constraint Preferences_pkey primary key (user_id),

    constraint Preferences_user_id_fkey foreign key (user_id)
    references auth.users (id) on update cascade on delete cascade
);

create policy "Users can only view their own preferences"
on public."Preferences" for select
using ((( select auth.uid() as uid) = user_id));

alter table public."Preferences" enable row level security;
