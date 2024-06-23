alter table public."Transaction"
add column if not exists user_id uuid not null default auth.uid();

alter table public."Transaction"
add constraint transaction_user_id_fkey
foreign key (user_id) references auth.users (id) on update cascade on delete cascade;

create index concurrently if not exists
    idx_transaction_user_id
on public."Transaction" (user_id);

drop policy if exists "Users can view transactions if they have at least one account" on public."Transaction";
drop policy if exists "Authenticated users can delete their transactions if they have at least one account" on public."Transaction";
drop policy if exists "Authenticated users can update their transactions if they have at least one account" on public."Transaction";
drop policy if exists "Users can create transactions if they have at least one account" on public."Transaction";

create policy "Users can only view their own transactions"
on public."Transaction" for select to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Users can only delete their own transactions"
on public."Transaction" for delete to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Users can only update their own transactions"
on public."Transaction" for update to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Users can only create their own transactions"
on public."Transaction" for insert to authenticated
with check ( (select auth.uid() as uid) = user_id );
