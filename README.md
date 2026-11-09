# ResolveU API

REST API sederhana untuk aplikasi helpdesk IT kampus ResolveU.  
Dibangun dengan Cloudflare Workers dan TypeScript, tanpa framework tambahan.

## Endpoint

| Method | Path          | Deskripsi                          |
| ------ | ------------- | ---------------------------------- |
| GET    | `/`           | Informasi API dan daftar endpoint  |
| GET    | `/tiket`      | Semua tiket                        |
| GET    | `/tiket?status=Open` | Filter tiket berdasarkan status (Open / Proses / Selesai) |
| GET    | `/tiket/:id`  | Detail satu tiket berdasarkan id   |

## Format Response

Semua response berbentuk JSON dengan struktur:

```json
{
  "success": true,
  "data": { ... },
  "message": "Berhasil mengambil data tiket"
}
```

## Contoh Response

### GET /tiket/1

```json
{
  "success": true,
  "data": {
    "id": "1",
    "nama": "Andi Pratama",
    "ruangan": "Lab 1",
    "kategori": "WiFi",
    "deskripsi": "WiFi tidak bisa connect di Lab 1, muncul error authentication failed",
    "status": "Open"
  },
  "message": "Berhasil mengambil data tiket"
}
```

## Deploy

```bash
npm install
npm run deploy
```
