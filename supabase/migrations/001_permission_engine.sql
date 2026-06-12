-- Resume PH Permission Engine

create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  price integer not null default 0,
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists features (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists plan_features (
  plan_id uuid not null references plans(id) on delete cascade,
  feature_id uuid not null references features(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (plan_id, feature_id)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null,
  reference text,
  provider text not null default 'manual',
  amount integer not null default 0,
  status text not null default 'pending',
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid not null,
  plan_id uuid not null references plans(id),
  payment_id uuid references payments(id),
  granted_by text,
  status text not null default 'active',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);