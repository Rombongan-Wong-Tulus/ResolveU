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
