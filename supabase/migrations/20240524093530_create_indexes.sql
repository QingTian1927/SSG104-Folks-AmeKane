create index concurrently if not exists
    idx_account_user_id
on public."Account" (user_id);

create index concurrently if not exists
    idx_category_user_id
on public."Category" (user_id);

create index concurrently if not exists
    idx_goal_user_id
on public."Goal" (user_id);

create index concurrently if not exists
    idx_goal_user_id
on public."Goal" (user_id);

create index concurrently if not exists
    idx_transaction_account_id
on public."Transaction" (account_id);

create index concurrently if not exists
    idx_transaction_category_id
on public."Transaction" (category_id);

create index concurrently if not exists
    idx_transaction_date
on public."Transaction" (date desc);
