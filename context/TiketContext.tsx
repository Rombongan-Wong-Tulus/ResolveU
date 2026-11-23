import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Status, Tiket } from "../constants/data";
import { useAuth } from "./AuthContext";
import { ambilTiketSaya, buatTiketBaru, hapusTiket, ubahStatusTiket } from "../services/tiketSupabase";

interface TiketContextValue {
  tiket: Tiket[];
  loading: boolean;
  error: string;
  muatUlang: () => void;
  tambahTiket: (input: Pick<Tiket, "nama" | "ruangan" | "deskripsi" | "kategori">) => Promise<void>;
  ubahStatus: (id: string, status: Status) => Promise<void>;
  hapus: (id: string) => Promise<void>;
  pesan: string;
  setPesan: (pesan: string) => void;
}

const TiketContext = createContext<TiketContextValue | undefined>(undefined);

export function TiketProvider({ children }: { children: ReactNode }) {
  // State data tiket, indikator loading, dan pesan error dari API.
  const [tiket, setTiket] = useState<Tiket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pesan, setPesan] = useState("");
  const { session } = useAuth();

  const muatUlang = () => {
    if (!session) {
      setTiket([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    ambilTiketSaya()
      .then((data) => setTiket(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Panggil muatUlang saat aplikasi pertama kali dibuka.
  useEffect(() => {
    muatUlang();
  }, [session?.user.id]);

  const tambahTiket = async (input: Pick<Tiket, "nama" | "ruangan" | "deskripsi" | "kategori">) => {
    const baru = await buatTiketBaru(input);
    setTiket((saatIni) => [baru, ...saatIni]);
  };

  const ubahStatus = async (id: string, status: Status) => {
    const sebelumnya = tiket;
    setTiket((saatIni) => saatIni.map((item) => (item.id === id ? { ...item, status } : item)));
    try {
      await ubahStatusTiket(id, status);
    } catch (err) {
      setTiket(sebelumnya);
      throw err;
    }
  };

  const hapus = async (id: string) => {
    const sebelumnya = tiket;
    setTiket((saatIni) => saatIni.filter((item) => item.id !== id));
    try {
      await hapusTiket(id);
    } catch (err) {
      setTiket(sebelumnya);
      throw err;
    }
  };

  return (
    <TiketContext.Provider
      value={{
        tiket,
        loading,
        error,
        muatUlang,
        tambahTiket,
        ubahStatus,
        hapus,
        pesan,
        setPesan,
      }}
    >
      {children}
    </TiketContext.Provider>
  );
}

// Hook untuk membaca tiket dari context bersama.
export function useTiket() {
  const context = useContext(TiketContext);
  if (!context) throw new Error("useTiket harus dipakai di dalam TiketProvider");
  return context;
}
