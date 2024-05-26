alter table if exists
    public."Profile"
add constraint
    Profile_default_account_fkey foreign key (default_account)
references
    public."Account" (id) on update cascade on delete set null;
