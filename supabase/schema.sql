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
