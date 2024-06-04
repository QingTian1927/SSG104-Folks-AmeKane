create policy "Authenticated users can update their accounts"
on public."Account" for update
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can update their saving goals"
on public."Goal" for update
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can update their categories"
on public."Category" for update
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can update their preferences"
on public."Preferences" for update
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can update their transactions if they have at least one account"
on public."Transaction" for update
to authenticated
using ((
    select exists (
        select id from public."Account" where (select auth.uid() as uid) = user_id
    )
));
