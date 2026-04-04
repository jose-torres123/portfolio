-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  content text,
  image_url text not null,
  technologies text[] default '{}' not null,
  github_url text,
  live_url text,
  featured boolean default false not null,
  archived boolean default false not null,

  constraint title_length check (char_length(title) >= 3),
  constraint description_length check (char_length(description) >= 10),
  constraint image_url_format check (image_url ~ '^https?://.*')
);

-- Set up RLS for projects
alter table public.projects enable row level security;

-- Create policies for projects
create policy "Projects are viewable by everyone." on projects
  for select using (true);

create policy "Authenticated users can insert projects." on projects
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects." on projects
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects." on projects
  for delete using (auth.role() = 'authenticated');

-- Create posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  published boolean default false not null,
  published_at timestamp with time zone,
  featured_image_url text,

  constraint title_length check (char_length(title) >= 3),
  constraint slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- Set up RLS for posts
alter table public.posts enable row level security;

-- Create policies for posts
create policy "Published posts are viewable by everyone." on posts
  for select using (published = true);

create policy "Authenticated users can view all posts." on posts
  for select using (auth.role() = 'authenticated');

create policy "Authenticated users can insert posts." on posts
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update posts." on posts
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete posts." on posts
  for delete using (auth.role() = 'authenticated');

-- Create tags table
create table public.tags (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  slug text unique not null,
  color text default '#6b7280',

  constraint name_length check (char_length(name) >= 2),
  constraint slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- Set up RLS for tags
alter table public.tags enable row level security;

-- Create policies for tags
create policy "Tags are viewable by everyone." on tags
  for select using (true);

create policy "Authenticated users can manage tags." on tags
  for all using (auth.role() = 'authenticated');

-- Create junction table for posts and tags
create table public.post_tags (
  post_id uuid references public.posts(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- Set up RLS for post_tags
alter table public.post_tags enable row level security;

create policy "Post tags are viewable by everyone." on post_tags
  for select using (true);

create policy "Authenticated users can manage post tags." on post_tags
  for all using (auth.role() = 'authenticated');

-- Create indexes for better performance
create index projects_featured_idx on projects(featured) where featured = true;
create index projects_created_at_idx on projects(created_at desc);
create index posts_published_idx on posts(published) where published = true;
create index posts_slug_idx on posts(slug);
create index posts_published_at_idx on posts(published_at desc);
create index tags_name_idx on tags(name);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.projects
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.posts
  for each row execute procedure public.handle_updated_at();
