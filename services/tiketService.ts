import { Tiket } from "../constants/data";
import { ApiResponse } from "../types/api";
import { delay } from "../utils/delay";

export const API_URL = "https://resolveu-api.ricoagista.workers.dev";

// Mengambil tiket dari API menggunakan Promise dan .then.
export function ambilTiket(): Promise<Tiket[]> {
  return new Promise<Tiket[]>((resolve, reject) => {
    fetch(`${API_URL}/tiket`)
      .then((response) => response.json())
      .then((body: ApiResponse<Tiket[]>) => {
        if (body.success) {
          resolve(body.data);
        } else {
          reject(new Error(body.message));
        }
      })
      .catch(() =>
        reject(new Error("Gagal terhubung ke server. Periksa koneksi internet.")),
      );
  });
}

// Menunda pemuatan agar indikator loading terlihat saat demo.
export async function muatTiket(): Promise<Tiket[]> {
  await delay(800);
  const hasil = await ambilTiket();
  return hasil;
}
