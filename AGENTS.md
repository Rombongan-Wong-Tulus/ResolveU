# AGENTS.md

## Project
ResolveU — Aplikasi Helpdesk & Ticketing IT Kampus
Stack: Expo + TypeScript + Expo Router
Design: Linear dark theme (lihat DESIGN.md)

## Wajib dibaca sebelum menulis kode
- `DESIGN.md` → tokens warna, tipografi, spacing, radius, pattern komponen
- `app/constants/data.ts` → type, interface, data dummy

## Aturan styling (KRITIS)
- SEMUA style lewat `StyleSheet.create()` di `app/constants/styles.ts`
- Inline style HANYA untuk warna background status badge
- WAJIB pakai token dari `DESIGN.md`. Jangan hardcode warna baru.
- TEMA default mengikuti perangkat; palet gelap dan terang didefinisikan di `constants/styles.ts` (`colorsDark`, `colorsLight`). Palet gelap tetap acuan DESIGN.md.
  - Canvas / background: `#010102` (token `colorsDark.canvas`)
  - Card surface: `#0f1011` (token `colorsDark.surface-1`)
  - Text utama: `#f7f8f8` (token `colorsDark.ink`)
  - Text muted: `#d0d6e0` (token `colorsDark.inkMuted`)
  - Text subtle: `#8a8f98` (token `colorsDark.inkSubtle`)
  - Border: `#23252a` (token `colorsDark.hairline`)
  - Primary / CTA: `#5e6ad2` (token `colorsDark.primary`)
- DILARANG pakai drop shadow / elevation. Linear depth = surface ladder + hairline border.
- DILARANG pakai gradient, spotlight card, atau warna chromatic kedua.
- DILARANG pakai emoji di UI.
- Status badge BOLEH pakai warna semantik (pengecualian terdokumentasi di Known Gaps DESIGN.md):
  - Open:    `#ef4444` (merah)
  - Proses:  `#f59e0b` (orange)
  - Selesai: `#27a644` (semantic-success dari DESIGN.md)

## Aturan tipografi
- Font family: `System` (SF Pro Display di iOS, Roboto di Android) — fallback Linear
- Judul:   20–22px, weight 600, letterSpacing -0.4
- Subtitle: 14px, weight 400, color ink-subtle
- Body:     16px, weight 400, color ink
- Caption:  12px, weight 400, color ink-muted

## Aturan radius
- Card:  12px (rounded.lg)
- Input: 8px  (rounded.md)
- Button: 8px (rounded.md)
- Badge: 9999px (rounded.pill)

## Aturan kode
- Bahasa: TypeScript (.tsx)
- Hanya komponen dasar RN: View, Text, TextInput, Button, Pressable, FlatList
- Dilarang pakai library tambahan (tanpa axios, react-navigation, AsyncStorage, dsb)
- Dilarang pakai gambar eksternal atau database
- Looping data WAJIB pakai FlatList, dilarang `.map()`
- State pakai `useState` untuk data tiket dan input form
- Tidak ada import yang tidak dipakai

## Konflik aturan
Jika prompt user bertentangan dengan `DESIGN.md`, maka `DESIGN.md` yang menang.
Jika `DESIGN.md` bertentangan dengan aturan di file ini, `DESIGN.md` tetap menang.
Khusus status badge: warna merah/orange/hijau DIIZINKAN karena DESIGN.md 
mendokumentasikannya sebagai warna in-product Linear (Known Gaps).

## Struktur file yang diharapkan
- `app/_layout.tsx`
- `app/index.tsx`
- `app/buat.tsx`
- `app/tiket/[id].tsx` → dikerjakan di tahap berikutnya
- `app/[...unmatched].tsx` → dikerjakan di tahap berikutnya
- `context/TiketContext.tsx`
- `constants/data.ts`
- `constants/styles.ts`
- `context/ThemeContext.tsx` (ContextTema)

## Modul 2
Modul 2 mengizinkan expo-router (Stack, Link, router), React Hooks (useState, useEffect, useMemo, useContext, useRef), dan Context API.
`useColorScheme` dari react-native boleh dipakai untuk membaca tema perangkat pada ContextTema.