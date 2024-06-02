create policy "Users can create accounts"
on public."Account" for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can create saving goals"
on public."Goal" for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can create categories"
on public."Category" for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can create transactions if they have at least one account"
on public."Transaction" for insert
to authenticated
with check ((
    select exists (
        select id from public."Account" where (select auth.uid()) = user_id
    )
));
