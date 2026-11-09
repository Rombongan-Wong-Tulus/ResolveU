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

export function isKategori(value: string): value is Kategori {
  return KATEGORI.includes(value as Kategori);
}

export function isStatus(value: string): value is Status {
  return STATUS.includes(value as Status);
}

// Urutan status: Open -> Proses -> Selesai. Selesai adalah status akhir (null).
export function statusBerikutnya(status: Status): Status | null {
  if (status === "Open") return "Proses";
  if (status === "Proses") return "Selesai";
  if (status === "Selesai") return null;
  return null;
}
