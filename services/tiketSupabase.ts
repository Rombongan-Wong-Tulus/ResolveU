import type { Status, Tiket } from "../constants/data";
import { keTiket } from "../types/database";
import { supabase } from "./supabase";

export type BuatTiketInput = Pick<
  Tiket,
  "nama" | "ruangan" | "deskripsi" | "kategori"
>;

export async function ambilTiketSaya(): Promise<Tiket[]> {
  const { data, error } = await supabase
    .from("tiket")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil tiket: ${error.message}`);
  }

  const tickets: Tiket[] = [];
  for (const row of data) {
    tickets.push(keTiket(row));
  }
  return tickets;
}

export async function buatTiketBaru(input: BuatTiketInput): Promise<Tiket> {
  const { data, error } = await supabase
    .from("tiket")
    .insert({
      nama_pelapor: input.nama,
      ruangan: input.ruangan,
      deskripsi: input.deskripsi,
      kategori: input.kategori,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Gagal membuat tiket: ${error.message}`);
  }
  if (!data) {
    throw new Error("Tiket berhasil dikirim tetapi data balasan tidak tersedia.");
  }

  return keTiket(data);
}

export async function ubahStatusTiket(
  id: string,
  status: Status,
): Promise<Tiket> {
  const { data, error } = await supabase
    .from("tiket")
    .update({ status })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengubah status tiket: ${error.message}`);
  }
  if (!data) {
    throw new Error("Tiket tidak ditemukan atau Anda tidak memiliki akses.");
  }

  return keTiket(data);
}

export async function hapusTiket(id: string): Promise<Tiket> {
  const { data, error } = await supabase
    .from("tiket")
    .delete()
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal menghapus tiket: ${error.message}`);
  }
  if (!data) {
    throw new Error("Tiket tidak ditemukan atau Anda tidak memiliki akses.");
  }

  return keTiket(data);
}
