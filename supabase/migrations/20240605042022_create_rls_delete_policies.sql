create policy "Authenticated users can delete their accounts"
on public."Account" for delete
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can delete their saving goals"
on public."Goal" for delete
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can delete their categories"
on public."Category" for delete
to authenticated
using ( (select auth.uid() as uid) = user_id );

create policy "Authenticated users can delete their transactions if they have at least one account"
on public."Transaction" for delete
to authenticated
using ((
    select exists (
        select id from public."Account" where (select auth.uid() as uid) = user_id
    )
));
