-- 广东省信用协会可信资讯中心
-- PostgreSQL 16 production schema baseline.
-- This file is a reviewed deployment scaffold; it has not been applied to a live database.

create extension if not exists pgcrypto;
create schema if not exists app;

create table if not exists cms_users (
  id uuid primary key default gen_random_uuid(),
  external_subject text not null unique,
  display_name text not null,
  department text,
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cms_roles (
  code text primary key,
  name text not null,
  description text not null
);

insert into cms_roles (code, name, description) values
  ('editor', '内容编辑', '创建与修改稿件，不得签发'),
  ('copy_reviewer', '编辑初审', '检查事实、标题、授权和敏感信息'),
  ('business_reviewer', '业务复核', '检查政策口径、专业判断和会员边界'),
  ('signatory', '负责人签发', '确认发布主体、渠道、时间与版本'),
  ('submission_user', '会员报送人', '仅管理所属主体的报送材料'),
  ('administrator', '系统管理员', '管理账号与配置，不替代业务审核')
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description;

create table if not exists cms_user_roles (
  user_id uuid not null references cms_users(id) on delete cascade,
  role_code text not null references cms_roles(code) on delete restrict,
  granted_by uuid references cms_users(id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role_code)
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  slug text not null unique,
  title text not null,
  summary text not null default '',
  body jsonb not null default '[]'::jsonb,
  content_type text not null,
  channel text not null,
  publisher_name text not null,
  owner_id uuid references cms_users(id) on delete set null,
  risk_level text not null default 'low' check (risk_level in ('low', 'medium', 'high')),
  workflow_status text not null default 'draft'
    check (workflow_status in ('draft', 'editing', 'first_review', 'business_review', 'signoff', 'scheduled', 'published', 'returned', 'withdrawn')),
  citation_boundary text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  canonical_url text,
  keywords text[] not null default '{}',
  schema_options jsonb not null default '{"article":true,"breadcrumb":true,"faq":false}'::jsonb,
  current_version integer not null default 1,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_updated_idx on articles (workflow_status, updated_at desc);
create index if not exists articles_channel_published_idx on articles (channel, published_at desc);

create table if not exists article_sources (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  source_name text not null,
  source_url text not null,
  source_type text not null
    check (source_type in ('government', 'association', 'member', 'expert', 'third_party')),
  supported_claim text not null,
  verification_status text not null default 'pending'
    check (verification_status in ('verified', 'pending', 'expired')),
  verified_by uuid references cms_users(id) on delete set null,
  verified_at timestamptz,
  source_published_at date,
  snapshot_object_key text,
  content_hash text,
  created_at timestamptz not null default now()
);

create index if not exists article_sources_article_idx on article_sources (article_id);

create table if not exists article_revisions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  version integer not null,
  snapshot jsonb not null,
  change_summary text not null,
  created_by uuid references cms_users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (article_id, version)
);

create table if not exists workflow_events (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  from_status text,
  to_status text not null,
  action text not null,
  note text not null default '',
  actor_id uuid references cms_users(id) on delete set null,
  actor_role text not null,
  request_id text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists workflow_events_article_time_idx on workflow_events (article_id, created_at desc);

create table if not exists publication_records (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  article_version integer not null,
  target text not null check (target in ('website', 'wechat', 'api')),
  public_url text not null,
  canonical_url text not null,
  structured_data jsonb not null default '{}'::jsonb,
  sitemap_status text not null default 'pending',
  cache_status text not null default 'pending',
  published_by uuid references cms_users(id) on delete set null,
  published_at timestamptz not null default now(),
  withdrawn_at timestamptz
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  object_key text not null unique,
  filename text not null,
  mime_type text not null,
  sha256 text not null,
  rights_holder text not null,
  authorization_scope text not null,
  authorization_expires_at date,
  alt_text text not null,
  uploaded_by uuid references cms_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists member_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_code text not null unique,
  organization_name text not null,
  submitter_subject text not null,
  title text not null,
  payload jsonb not null,
  authorization_status text not null default 'missing'
    check (authorization_status in ('complete', 'partial', 'missing')),
  processing_status text not null default 'pending'
    check (processing_status in ('pending', 'converted', 'rejected')),
  converted_article_id uuid references articles(id) on delete set null,
  submitted_at timestamptz not null default now(),
  processed_at timestamptz
);

-- The API must set app.user_id to the authenticated cms_users.id for each transaction.
create or replace function app.current_user_id()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('app.user_id', true), '')::uuid
$$;

create or replace function app.has_role(required_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from cms_user_roles
    where user_id = app.current_user_id()
      and role_code = any(required_roles)
  )
$$;

alter table articles enable row level security;
alter table article_sources enable row level security;
alter table article_revisions enable row level security;
alter table workflow_events enable row level security;
alter table publication_records enable row level security;
alter table media_assets enable row level security;
alter table member_submissions enable row level security;

create policy articles_read_staff on articles
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy articles_edit_drafts on articles
  for update using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']))
  with check (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy articles_create_staff on articles
  for insert with check (app.has_role(array['editor','administrator']));

create policy sources_read_staff on article_sources
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy sources_write_staff on article_sources
  for all using (app.has_role(array['editor','copy_reviewer','business_reviewer','administrator']))
  with check (app.has_role(array['editor','copy_reviewer','business_reviewer','administrator']));

create policy revisions_read_staff on article_revisions
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy revisions_append_staff on article_revisions
  for insert with check (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));

create policy workflow_read_staff on workflow_events
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy workflow_append_reviewers on workflow_events
  for insert with check (app.has_role(array['copy_reviewer','business_reviewer','signatory','administrator']));

create policy publication_read_staff on publication_records
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy publication_write_signatory on publication_records
  for all using (app.has_role(array['signatory','administrator']))
  with check (app.has_role(array['signatory','administrator']));

create policy media_read_staff on media_assets
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','signatory','administrator']));
create policy media_write_staff on media_assets
  for all using (app.has_role(array['editor','administrator']))
  with check (app.has_role(array['editor','administrator']));

create policy submissions_read_staff on member_submissions
  for select using (app.has_role(array['editor','copy_reviewer','business_reviewer','administrator']));
create policy submissions_process_staff on member_submissions
  for update using (app.has_role(array['editor','copy_reviewer','administrator']))
  with check (app.has_role(array['editor','copy_reviewer','administrator']));

