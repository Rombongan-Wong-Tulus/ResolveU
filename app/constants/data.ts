export const KATEGORI = ["WiFi", "Komputer", "Printer", "Akun"] as const;
export type Kategori = (typeof KATEGORI)[number];

export const STATUS = ["Open", "Proses", "Selesai"] as const;
export type Status = (typeof STATUS)[number];

export interface Tiket {
  id: string;
  nama: string;
  ruangan: string;
  kategori: Kategori;
  deskripsi: string;
  status: Status;
}

export const tiketAwal: Tiket[] = [
  {
    id: "1",
    nama: "Rico",
    ruangan: "Lab 3",
    kategori: "WiFi",
    deskripsi: "Tidak bisa connect ke WiFi kampus",
    status: "Open",
  },
  {
    id: "2",
    nama: "Dicky",
    ruangan: "Lab 1",
    kategori: "Printer",
    deskripsi: "Printer error saat print",
    status: "Proses",
  },
  {
    id: "3",
    nama: "Sari",
    ruangan: "Lab 2",
    kategori: "Akun",
    deskripsi: "Tidak bisa login akun kampus",
    status: "Selesai",
  },
];

export function isKategori(value: string): value is Kategori {
  return KATEGORI.includes(value as Kategori);
}
