create table bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  equipment_id uuid references equipment(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  rental_period text check (rental_period in ('daily', 'weekly', 'monthly')),
  delivery_option text check (delivery_option in ('pickup', 'delivery')),
  special_requests text,
  card_name text,
  card_number text, -- ⚠️ Store only if tokenized
  expiry_date text,
  cvv text,
  insurance_fee numeric,
  delivery_fee numeric,
  total_price numeric,
  created_at timestamp with time zone default now()
);
