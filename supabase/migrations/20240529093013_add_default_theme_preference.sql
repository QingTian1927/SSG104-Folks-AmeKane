alter table if exists
    public."Preferences"
add column if not exists
    default_theme public."Theme"
    not null default 'system'::public."Theme";
