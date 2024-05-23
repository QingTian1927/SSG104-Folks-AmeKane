create table if not exists "public"."Profile" (
    "user_id" "uuid" not null,
    "display_name" "text",
    "default_account" "uuid",
    "currency" character varying default 'đ'::character varying,
    "created_at" timestamp with time zone default "now"() not null,

    constraint "profile_pkey" primary key ("user_id"),
    constraint "profile_user_id_fkey" foreign key ("user_id")
    references "auth"."users"("id") on update cascade on delete cascade
);

create policy "Users can only view their own profile"
on "public"."Profile" for select
using ((( select "auth"."uid"() as "uid") = "user_id"));

alter table "public"."Profile" enable row level security;
