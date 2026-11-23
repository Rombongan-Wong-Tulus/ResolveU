create table if not exists public.tiket (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  nama_pelapor text not null,
  ruangan text not null,
  deskripsi text not null,
  kategori text not null
    check (kategori in ('WiFi', 'Komputer', 'Printer', 'Akun')),
  status text not null default 'Open'
    check (status in ('Open', 'Proses', 'Selesai')),
  created_at timestamptz not null default now()
);

alter table public.tiket enable row level security;

create policy "Pengguna dapat melihat tiket miliknya"
  on public.tiket
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Pengguna dapat membuat tiket atas namanya"
  on public.tiket
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Pengguna dapat mengubah tiket miliknya"
  on public.tiket
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Pengguna dapat menghapus tiket miliknya"
  on public.tiket
  for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists tiket_user_id_idx on public.tiket(user_id);

-- Jalankan setelah akun rico@rico.rico dibuat melalui Supabase Auth.
insert into public.tiket (user_id, nama_pelapor, ruangan, deskripsi, kategori, status)
select u.id, 'Rico', 'Ruang ' || ((n % 20) + 1), 'Data demo tiket ' || n,
  (array['WiFi', 'Komputer', 'Printer', 'Akun'])[((n - 1) % 4) + 1],
  (array['Open', 'Proses', 'Selesai'])[((n - 1) % 3) + 1]
from generate_series(1, 100000) as n
cross join lateral (select id from auth.users where email = 'rico@rico.rico' limit 1) as u;
