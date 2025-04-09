create table equipment (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  name text not null,
  category text not null,
  description text not null,
  daily_price numeric not null,
  weekly_price numeric,
  monthly_price numeric,
  location text not null,
  image_urls text[],
  created_at timestamp with time zone default now()
);
