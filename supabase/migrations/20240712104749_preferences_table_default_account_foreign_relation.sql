alter table
    public."Preferences"
add constraint
    preferences_default_account_fkey
foreign key
    (default_account) references public."Account" (id)
on update cascade on delete set null;
