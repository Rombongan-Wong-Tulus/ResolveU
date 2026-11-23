import type { Kategori, Status, Tiket } from "../constants/data";

export type TiketRow = {
  id: string;
  user_id: string;
  nama_pelapor: string;
  ruangan: string;
  deskripsi: string;
  kategori: Kategori;
  status: Status;
  created_at: string;
}

export type TiketInsert = Pick<
  TiketRow,
  "nama_pelapor" | "ruangan" | "deskripsi" | "kategori"
> &
  Partial<Pick<TiketRow, "id" | "user_id" | "status" | "created_at">>;

export type TiketUpdate = Partial<TiketInsert>;

export function keTiket(row: TiketRow): Tiket {
  return {
    id: row.id,
    nama: row.nama_pelapor,
    ruangan: row.ruangan,
    deskripsi: row.deskripsi,
    kategori: row.kategori,
    status: row.status,
  };
}

export type Database = {
  public: {
    Tables: {
      tiket: {
        Row: TiketRow;
        Insert: TiketInsert;
        Update: TiketUpdate;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
