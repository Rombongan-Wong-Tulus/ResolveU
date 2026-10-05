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
- DARK THEME wajib:
  - Canvas / background: `#010102` (token `colors.canvas`)
  - Card surface: `#0f1011` (token `colors.surface-1`)
  - Text utama: `#f7f8f8` (token `colors.ink`)
  - Text muted: `#d0d6e0` (token `colors.ink-muted`)
  - Text subtle: `#8a8f98` (token `colors.ink-subtle`)
  - Border: `#23252a` (token `colors.hairline`)
  - Primary / CTA: `#5e6ad2` (token `colors.primary`)
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
- `app/index.tsx`              → komponen utama
- `app/constants/styles.ts`    → StyleSheet
- `app/constants/data.ts`      → type, interface, data dummy