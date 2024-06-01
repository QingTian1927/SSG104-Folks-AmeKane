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

create policy "Accounts can create transactions"
on public."Transaction" for insert
to authenticated
with check ( (select id from public."Account") = account_id );
