# ResolveU

ResolveU adalah aplikasi **Helpdesk & Ticketing IT Kampus** berbasis Expo dan React Native. Aplikasi ini digunakan untuk membuat dan menampilkan laporan masalah IT kampus, seperti koneksi WiFi, komputer, printer, dan akun.

## Stack

- Expo SDK 57
- React Native
- TypeScript
- Expo Router
- React Native `FlatList`, `TextInput`, dan `Pressable`

Tidak ada database atau layanan API. Data tiket saat ini disimpan di state React sehingga akan kembali ke data dummy setelah aplikasi dimuat ulang.

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
2. Membuat tiket baru melalui empat input:
   - Nama pelapor
   - Ruangan
   - Deskripsi masalah
   - Kategori
3. Validasi agar semua input terisi dan kategori sesuai pilihan:
   `WiFi`, `Komputer`, `Printer`, atau `Akun`.
4. Menambahkan tiket baru dengan status awal `Open`.
5. Menampilkan tiket menggunakan `FlatList`.
6. Menampilkan status tiket dengan badge warna semantik:
   - `Open`: merah
   - `Proses`: orange
   - `Selesai`: hijau
7. Memfilter tiket berdasarkan status melalui parameter URL.
8. Membuat tiket dalam modal, dengan aksi kirim dan batal.
9. Menampilkan notifikasi sementara setelah tiket dibuat atau status diperbarui.
10. Menampilkan halaman tidak ditemukan untuk URL yang tidak cocok.

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
├── constants/
│   ├── data.ts
│   └── styles.ts
├── context/
│   └── TiketContext.tsx
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
├── AGENTS.md
└── DESIGN.md
```

## Penjelasan Kode

### `app/_layout.tsx`

Membungkus route dengan `TiketProvider` dan mengatur Stack untuk beranda, modal buat tiket, detail, dan catch-all.

### `app/index.tsx`

Layar daftar menggunakan `useContext` lewat `useTiket`, `useMemo` untuk filter dan hitungan, serta `FlatList` untuk tiket. Filter disimpan lewat `router.setParams`; notifikasi dihapus dengan `useEffect` setelah 2,5 detik.

### `app/buat.tsx`

Form memakai `useState` dan validasi sebelum menambah tiket ke context. `useEffect` menghapus error ketika isi form berubah. Kirim dan Batal menutup modal dengan `router.dismiss()`.

### `app/tiket/[id].tsx` dan `app/[...unmatched].tsx`

Halaman detail membaca ID melalui `useLocalSearchParams`, mengubah status bertahap, dan kembali dengan `router.back()` atau `router.replace("/")`. Catch-all menampilkan path yang diminta dan menyediakan navigasi kembali ke beranda.

### `constants/`, `context/`

`constants/data.ts` berisi tipe, data awal, dan fungsi validasi status/kategori. `constants/styles.ts` menyimpan token dan seluruh style. `context/TiketContext.tsx` mengelola data tiket dan pesan bersama dengan `useState`.

## Alur Navigasi dan Submit

```text
Beranda (/) -> Buat Tiket (modal) -> Kirim -> tiket ditambahkan di urutan teratas
                              -> Batal -> modal ditutup tanpa perubahan
Beranda -> Detail tiket -> Ubah status -> Kembali ke daftar
URL tidak dikenal -> Halaman tidak ditemukan -> Kembali ke Beranda
```

Setelah kirim valid atau status berubah, banner notifikasi tampil selama 2,5 detik. Filter status tetap berada di URL beranda.

## Catatan Maintenance

- Tambah kategori baru di `KATEGORI` pada `constants/data.ts`.
- Tambah status baru harus dilakukan di `STATUS`, lalu tambahkan warna status tersebut di `STATUS_COLORS`.
- Ubah warna atau ukuran tampilan di `constants/styles.ts`, bukan di komponen.
- Ubah data awal hanya di `tiketAwal`.
- Pertahankan penggunaan `FlatList` untuk daftar data dan jangan menggantinya dengan `.map()`.
- `AGENTS.md` dan `DESIGN.md` adalah sumber aturan implementasi dan desain.

## Verifikasi

```bash
npx tsc --noEmit
npx expo export --platform web --output-dir /tmp/resolveu-check
```
