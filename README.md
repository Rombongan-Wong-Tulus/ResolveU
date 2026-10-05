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
npm install
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

## Struktur Folder

```text
ResolveU/
├── app/
│   ├── index.tsx
│   └── constants/
│       ├── data.ts
│       └── styles.ts
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
├── AGENTS.md
└── DESIGN.md
```

## Penjelasan Kode

### `app/index.tsx`

File ini adalah layar utama aplikasi.

- `FormTiket` menyatukan empat nilai input form dalam satu tipe.
- `FORM_AWAL` menjadi nilai awal dan nilai reset form.
- `formValid()` memeriksa field kosong dan memastikan kategori valid.
- `buatTiket()` mengubah data form menjadi objek `Tiket` baru.
- `renderTiketCard()` menjadi renderer tunggal untuk setiap item pada `FlatList`.
- `FormTiketView` menangani tampilan form agar komponen utama tetap ringkas.
- `updateForm()` memperbarui satu field form tanpa mengulang setter terpisah.
- `kirimTiket()` memvalidasi form, menambahkan tiket di bagian paling atas, lalu mereset form.

### `app/constants/data.ts`

File ini berisi model data dan data awal aplikasi.

- `KATEGORI` adalah daftar kategori yang didukung.
- `Kategori` dibuat dari daftar kategori tersebut sehingga tipe dan validasi memakai sumber yang sama.
- `STATUS` dan `Status` mendefinisikan status tiket.
- `Tiket` mendefinisikan bentuk data tiket.
- `tiketAwal` berisi tiga tiket dummy.
- `isKategori()` menjadi type guard untuk memeriksa input kategori sebelum dipakai sebagai `Kategori`.

### `app/constants/styles.ts`

File ini menjadi pusat styling aplikasi.

- `colors` menyimpan token warna dari `DESIGN.md`.
- `styles` menyimpan semua style menggunakan `StyleSheet.create()`.
- Warna status badge dipilih melalui `STATUS_COLORS` di `app/index.tsx`, sedangkan penggunaan warna background badge tetap menjadi satu-satunya inline style sesuai aturan project.
- Tidak ada shadow, elevation, gradient, atau warna dekoratif tambahan.

## Alur Submit Tiket

```text
Input form
  -> formValid()
  -> buatTiket()
  -> setTiket()
  -> reset form
```

Jika satu field kosong atau kategori tidak sesuai, tiket tidak dibuat dan data form tetap dipertahankan agar dapat diperbaiki.

## Catatan Maintenance

- Tambah kategori baru di `KATEGORI` pada `app/constants/data.ts`.
- Tambah status baru harus dilakukan di `STATUS`, lalu tambahkan warna status tersebut di `STATUS_COLORS`.
- Ubah warna atau ukuran tampilan di `app/constants/styles.ts`, bukan di komponen.
- Ubah data awal hanya di `tiketAwal`.
- Pertahankan penggunaan `FlatList` untuk daftar data dan jangan menggantinya dengan `.map()`.
- `AGENTS.md` dan `DESIGN.md` adalah sumber aturan implementasi dan desain.

## Verifikasi

```bash
npx tsc --noEmit
npx expo-doctor
```
