alter table
    public."Transaction"
add column
    fts tsvector generated always as
        (to_tsvector('simple', title || ' ' || description))
    stored;

create index concurrently if not exists
    fts_transaction
on public."Transaction" using gin (fts);
