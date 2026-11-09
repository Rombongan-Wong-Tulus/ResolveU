import { daftarTiket } from "./data";

// Header CORS yang ditambahkan ke semua response
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Helper: buat Response JSON dengan CORS
function kirimJson(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders,
    },
  });
}

// Status yang valid untuk filter
const statusValid = new Set(["Open", "Proses", "Selesai"]);

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      // Tangani preflight CORS
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      // Hanya izinkan method GET
      if (request.method !== "GET") {
        return kirimJson(
          { success: false, data: null, message: "Method tidak diizinkan, gunakan GET" },
          405,
        );
      }

      const url = new URL(request.url);
      const path = url.pathname;

      // GET / — info API
      if (path === "/") {
        return kirimJson(
          {
            success: true,
            data: {
              nama: "ResolveU API",
              versi: "1.0.0",
              endpoints: [
                "GET /",
                "GET /tiket",
                "GET /tiket/:id",
              ],
            },
            message: "Selamat datang di ResolveU API",
          },
          200,
        );
      }

      // GET /tiket — semua tiket (opsional filter ?status=)
      if (path === "/tiket") {
        const statusFilter = url.searchParams.get("status");

        if (statusFilter !== null && !statusValid.has(statusFilter)) {
          return kirimJson(
            { success: false, data: null, message: "Status tidak valid, gunakan: Open, Proses, atau Selesai" },
            400,
          );
        }

        const hasil = statusFilter
          ? daftarTiket.filter((t) => t.status === statusFilter)
          : daftarTiket;

        return kirimJson(
          { success: true, data: hasil, message: "Berhasil mengambil data tiket" },
          200,
        );
      }

      // GET /tiket/:id — satu tiket berdasarkan id
      const match = path.match(/^\/tiket\/([^/]+)$/);
      if (match) {
        const id = match[1];
        const tiket = daftarTiket.find((t) => t.id === id);

        if (!tiket) {
          return kirimJson(
            { success: false, data: null, message: `Tiket dengan id "${id}" tidak ditemukan` },
            404,
          );
        }

        return kirimJson(
          { success: true, data: tiket, message: "Berhasil mengambil data tiket" },
          200,
        );
      }

      // Path tidak dikenali
      return kirimJson(
        { success: false, data: null, message: "Endpoint tidak ditemukan" },
        404,
      );
    } catch (error) {
      // Error tak terduga
      return kirimJson(
        { success: false, data: null, message: "Terjadi kesalahan pada server" },
        500,
      );
    }
  },
};
