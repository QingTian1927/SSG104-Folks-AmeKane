create index concurrently if not exists
    idx_account_profile_id
on public."Account" (profile_id);

create index concurrently if not exists
    idx_category_profile_id
on public."Category" (profile_id);

create index concurrently if not exists
    idx_goal_profile_id
on public."Goal" (profile_id);

create index concurrently if not exists
    idx_goal_profile_id
on public."Goal" (profile_id);

create index concurrently if not exists
    idx_transaction_account_id
on public."Transaction" (account_id);

create index concurrently if not exists
    idx_transaction_category_id
on public."Transaction" (category_id);

create index concurrently if not exists
    idx_transaction_date
on public."Transaction" (date desc);
