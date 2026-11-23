# ResolveU

ResolveU adalah aplikasi **Helpdesk & Ticketing IT Kampus** berbasis Expo dan React Native. Aplikasi ini digunakan untuk membuat dan menampilkan laporan masalah IT kampus, seperti koneksi WiFi, komputer, printer, dan akun.

## Stack

- Expo SDK 57
- React Native
- TypeScript
- Expo Router
- React Native `FlatList`, `TextInput`, `Pressable`, dan `ActivityIndicator`

Data tiket diambil dari API eksternal Cloudflare Workers (`https://resolveu-api.ricoagista.workers.dev`, `GET /tiket`). Tiket baru dan perubahan status disimpan di state lokal aplikasi (API hanya menyediakan endpoint GET).

## Menjalankan Project

```bash
npm ci
npx expo start
```

Perintah tambahan:

```bash
npm run android
npm run ios
npm run web
```

## Fitur

1. Menampilkan header ResolveU dan identitas Helpdesk IT Kampus.
2. Mengambil data tiket awal dari API eksternal secara asinkron.
3. Menampilkan indikator loading saat data tiket sedang dimuat dari API.
4. Menampilkan pesan error dan tombol Coba Lagi jika koneksi atau pengambilan data gagal.
5. Membuat tiket baru melalui empat input:
   - Nama pelapor
   - Ruangan
   - Deskripsi masalah
   - Kategori
6. Validasi agar semua input terisi dan kategori sesuai pilihan:
   `WiFi`, `Komputer`, `Printer`, atau `Akun`.
7. Menambahkan tiket baru dengan status awal `Open`.
8. Menampilkan tiket menggunakan `FlatList`.
9. Menampilkan status tiket dengan badge warna semantik:
   - `Open`: merah
   - `Proses`: orange
   - `Selesai`: hijau
10. Memfilter tiket berdasarkan status melalui parameter URL.
11. Membuat tiket dalam modal, dengan aksi kirim dan batal.
12. Menampilkan notifikasi sementara setelah tiket dibuat atau status diperbarui.
13. Menampilkan halaman tidak ditemukan untuk URL yang tidak cocok.
14. Mode terang/gelap: tema awal mengikuti perangkat, bisa diganti lewat tombol di header.

## Struktur Folder

```text
ResolveU/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── buat.tsx
│   ├── [...unmatched].tsx
│   └── tiket/
│       └── [id].tsx
├── components/
│   ├── ErrorMessage.tsx
│   └── Loading.tsx
├── constants/
│   ├── data.ts
│   └── styles.ts
├── context/
│   ├── TiketContext.tsx
│   └── ThemeContext.tsx
├── services/
│   └── tiketService.ts
├── types/
│   └── api.ts
├── utils/
│   └── delay.ts
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
├── AGENTS.md
└── DESIGN.md
```

## Penjelasan Kode

### `app/_layout.tsx`

Membungkus route dengan `ThemeProvider` lalu `TiketProvider` dan mengatur Stack untuk beranda, modal buat tiket, detail, dan catch-all. Tombol tema ada di header beranda.

### `app/index.tsx`

Layar daftar menggunakan `useContext` lewat `useTiket`, `useMemo` untuk filter dan hitungan, serta `FlatList` untuk tiket. Jika `loading` bernilai true, halaman menampilkan komponen `<Loading />`. Jika terjadi `error`, halaman menampilkan `<ErrorMessage pesan={error} onCoba={muatUlang} />`. Filter disimpan lewat `router.setParams`; notifikasi dihapus dengan `useEffect` setelah 2,5 detik.

### `app/buat.tsx`

Form memakai `useState` dan validasi sebelum menambah tiket ke context. `useEffect` menghapus error ketika isi form berubah. Kirim dan Batal menutup modal dengan `router.dismiss()`.

### `app/tiket/[id].tsx` dan `app/[...unmatched].tsx`

Halaman detail membaca ID melalui `useLocalSearchParams`, menampilkan `<Loading />` saat data tiket masih dimuat, mengubah status bertahap, dan kembali dengan `router.back()` atau `router.replace("/")`. Catch-all menampilkan path yang diminta dan menyediakan navigasi kembali ke beranda.

### `types/api.ts` dan `utils/delay.ts`

- `types/api.ts` mendefinisikan generic interface `ApiResponse<T>` yang memetakan response dari API (`success`, `data`, `message`).
- `utils/delay.ts` menyediakan helper function `delay(ms)` berbasis custom `Promise` dan `setTimeout` untuk memberikan jeda pemuatan agar indikator loading terlihat saat demo.

### `services/tiketService.ts`

Menyediakan fungsi komunikasi API:
- `ambilTiket()`: Membuat `new Promise<Tiket[]>` yang memanggil pre-built async `fetch`, mem-parsing JSON dengan `response.json()`, lalu memanggil `resolve(body.data)` jika sukses atau `reject(new Error(...))` jika gagal.
- `muatTiket()`: Custom async function yang menggunakan `await delay(800)` dan `await ambilTiket()` untuk mengambil daftar tiket.

### `components/Loading.tsx` dan `components/ErrorMessage.tsx`

- `Loading`: Menampilkan `ActivityIndicator` dan teks status pemuatan data di tengah layar sesuai tema aktif.
- `ErrorMessage`: Menampilkan pesan kesalahan berbahasa Indonesia dan tombol "Coba Lagi" yang memicu fungsi pemanggilan ulang data.

### `constants/`, `context/`

`constants/data.ts` berisi tipe `Tiket`, kategori, status, dan fungsi validasi serta siklus status berikutnya (data tiket awal tidak lagi disimpan secara lokal di file ini). `constants/styles.ts` menyimpan dua palet warna (`colorsDark`, `colorsLight`) dan `buatStyles(colors)` yang membuat seluruh style untuk tema aktif.

`context/TiketContext.tsx` mengelola state `tiket`, `loading`, `error`, dan `pesan`. Fungsi `muatUlang` memanggil `muatTiket()` dan menangani hasilnya menggunakan rantai `.then()`, `.catch()`, dan `.finally()`. Fungsi ini dijalankan otomatis saat aplikasi pertama kali dibuka melalui `useEffect`.

`context/ThemeContext.tsx` (`ThemeProvider` + `useTema`) menyimpan pilihan tema, membaca `useColorScheme` dari perangkat, lalu menyediakan `colors` dan `styles` ke semua halaman.

## Alur Pemuatan Data dari API

```text
Aplikasi dibuka / Tombol Coba Lagi
  └── TiketContext: muatUlang()
        └── tiketService: muatTiket() [async/await]
              ├── utils/delay: delay(800) [new Promise & setTimeout]
              └── tiketService: ambilTiket() [new Promise]
                    └── fetch("https://resolveu-api.ricoagista.workers.dev/tiket")
                          ├── .then(response.json())
                          ├── resolve(body.data) / reject(new Error(...))
                          └── .catch(reject(new Error(...)))
        └── .then((data) => setTiket(data))
        └── .catch((err) => setError(err.message))
        └── .finally(() => setLoading(false))
```

## Alur Navigasi dan Submit

```text
Beranda (/) -> Buat Tiket (modal) -> Kirim -> tiket ditambahkan di urutan teratas
                              -> Batal -> modal ditutup tanpa perubahan
Beranda -> Detail tiket -> Ubah status -> Kembali ke daftar
URL tidak dikenal -> Halaman tidak ditemukan -> Kembali ke Beranda
```

Setelah kirim valid atau status berubah, banner notifikasi tampil selama 2,5 detik. Filter status tetap berada di URL beranda.

## Catatan Maintenance

- Data sumber awal berada di API Cloudflare Workers (branch `api`, file `src/data.ts`).
- Tiket baru yang dibuat dan perubahan status hanya tersimpan di state lokal aplikasi saat runtime (API hanya mendukung GET).
- Tambah kategori baru di `KATEGORI` pada `constants/data.ts`.
- Tambah status baru harus dilakukan di `STATUS`, lalu tambahkan warna status tersebut di `STATUS_COLORS`.
- Ubah warna atau ukuran tampilan di `constants/styles.ts`, bukan di komponen.
- Palet terang/gelap ada di `colorsLight` dan `colorsDark`; pilihan tema disimpan di memori sehingga kembali mengikuti tema perangkat setelah aplikasi dimuat ulang.
- Pertahankan penggunaan `FlatList` untuk daftar data dan jangan menggantinya dengan `.map()`.
- `AGENTS.md` dan `DESIGN.md` adalah sumber aturan implementasi dan desain.

## Verifikasi

```bash
npx tsc --noEmit
npx expo export --platform web --output-dir /tmp/resolveu-check
```

## Modul 4: Database dan Autentikasi

Modul 4 menambahkan autentikasi Supabase, penyimpanan sesi dengan `expo-secure-store`, route protection, serta CRUD tiket berbasis Postgres dan RLS.

### Alur autentikasi

- `context/AuthContext.tsx` menyediakan `user`, `session`, `isLoading`, dan `signOut()` secara global.
- Saat aplikasi dibuka, `supabase.auth.getSession()` memulihkan sesi yang tersimpan.
- `supabase.auth.onAuthStateChange()` memperbarui state untuk login, logout, dan refresh token.
- Route group `app/(auth)` berisi halaman login/register.
- Route group `app/(app)` berisi daftar tiket, form tiket, dan detail tiket.
- Route guard menampilkan loading saat sesi diperiksa, mengarahkan pengguna yang belum login ke login, dan mengarahkan pengguna yang sudah login ke aplikasi.
- Tombol `Keluar` memakai `supabase.auth.signOut()`. Token tidak dihapus secara manual.

### Penyimpanan token

`services/secureStorage.ts` memakai `expo-secure-store` untuk menyimpan sesi Supabase pada perangkat. Adapter tersebut digunakan oleh singleton client di `services/supabase.ts`. `AsyncStorage` tidak digunakan untuk token atau sesi.

Aplikasi juga menyediakan fungsi demo `saveAuthToken`, `getAuthToken`, dan `deleteAuthToken` untuk memperlihatkan proses simpan, muat, dan hapus token secara eksplisit. Kredensial Supabase tetap dibaca dari `.env` melalui `EXPO_PUBLIC_SUPABASE_URL` dan `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

### Tiket cloud dan RLS

`context/TiketContext.tsx` mengambil data melalui `ambilTiketSaya()` dari `services/tiketSupabase.ts`, bukan lagi dari API Cloudflare. Data tiket dikosongkan ketika pengguna logout dan dimuat ulang ketika pengguna berubah.

- Create memakai `buatTiketBaru()` tanpa mengirim `user_id` dari klien.
- Database mengisi `user_id` dengan `auth.uid()`.
- Update status memakai `ubahStatusTiket()`.
- Delete memakai `hapusTiket()`.
- Update dan delete memakai optimistic UI dengan rollback jika Supabase mengembalikan error.
- Daftar tiket mendukung pull-to-refresh melalui `RefreshControl`.

RLS pada `supabase/schema.sql` membatasi SELECT, INSERT, UPDATE, dan DELETE berdasarkan `auth.uid()`. Karena itu, setiap akun hanya dapat melihat dan mengubah tiket miliknya sendiri. Akun baru dimulai dengan daftar tiket kosong.

### Setup Supabase

1. Salin `.env.example` menjadi `.env`.
2. Isi URL project dan anon key Supabase. Jangan memakai `service_role` key di aplikasi.
3. Buat akun pengujian `rico@rico.rico` melalui Supabase Auth Dashboard dengan password yang ditentukan untuk demo.
4. Jalankan `supabase/schema.sql` melalui SQL Editor Supabase.
5. Pastikan Confirm email dimatikan untuk pengujian lokal agar akun demo dapat langsung digunakan.
6. Uji dengan dua akun untuk memastikan RLS mengisolasi data tiket.

Schema menyediakan seed 100.000 tiket untuk akun Rico menggunakan `generate_series()`. Seed tersebut hanya dapat dijalankan setelah akun Rico sudah ada di Auth karena query mencari UUID dari `auth.users`. Pengguna lain tidak dapat melihat seed tersebut dan akan mulai tanpa tiket.

### Struktur Modul 4

```text
app/
├── (auth)/
│   ├── _layout.tsx
│   └── login.tsx
├── (app)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── buat.tsx
│   └── tiket/[id].tsx
├── _layout.tsx
└── [...unmatched].tsx
context/
├── AuthContext.tsx
├── ThemeContext.tsx
└── TiketContext.tsx
services/
├── secureStorage.ts
├── supabase.ts
└── tiketSupabase.ts
supabase/
└── schema.sql
```

## Supabase dan penyimpanan sesi

Salin `.env.example` menjadi `.env`, lalu isi URL project Supabase dan anon key
Anda sendiri. Jangan masukkan `service_role` key ke aplikasi. Jalankan
`supabase/schema.sql` melalui SQL Editor Supabase untuk membuat tabel tiket
beserta Row Level Security (RLS). Layanan Supabase baru berada di
`services/tiketSupabase.ts`; `services/tiketService.ts` dan alur aplikasi lama
belum dialihkan ke layanan baru.

Pada iOS dan Android, sesi Supabase dan token auth disimpan menggunakan
`expo-secure-store`. Nilai sesi dipecah menjadi bagian-bagian kecil karena
SecureStore mempunyai batas ukuran per nilai (sekitar 2 KB pada iOS); ini
menghindari kegagalan menyimpan JWT panjang tanpa memindahkan token ke
penyimpanan biasa.

SecureStore tidak tersedia di web. Sebagai fallback agar `npm run web` tetap
bisa memakai Supabase, adapter menggunakan `localStorage`. Browser `localStorage`
tidak memberikan perlindungan enkripsi setingkat Keychain/Keystore dan dapat
diakses JavaScript halaman, sehingga sesi web lebih terekspos jika terjadi
XSS. Jangan menganggap fallback web setara amannya dengan penyimpanan native.

### Kebijakan RLS tiket

- **SELECT** hanya menampilkan baris dengan `user_id` yang sama dengan pengguna
  yang sedang login.
- **INSERT** hanya menerima baris yang `user_id`-nya sama dengan pengguna login.
  Aplikasi tidak mengirim `user_id`; nilai default `auth.uid()` mengisinya.
- **UPDATE** memeriksa pemilik sebelum mengubah (`USING`) dan memastikan hasil
  perubahan tetap dimiliki pengguna yang sama (`WITH CHECK`).
- **DELETE** hanya mengizinkan penghapusan baris milik pengguna login.

`auth.uid()` adalah UUID pengguna dari JWT sesi Supabase yang sedang aktif.
Karena itu, klien tidak dapat memilih identitas pengguna lain untuk membaca,
membuat, mengubah, atau menghapus tiket. Semua kebijakan hanya berlaku untuk
role `authenticated`.
