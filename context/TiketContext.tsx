import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Status, Tiket } from "../constants/data";
import { muatTiket } from "../services/tiketService";

interface TiketContextValue {
  tiket: Tiket[];
  loading: boolean;
  error: string;
  muatUlang: () => void;
  tambahTiket: (tiket: Tiket) => void;
  ubahStatus: (id: string, status: Status) => void;
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

  // Memuat data tiket dari API menggunakan service muatTiket.
  const muatUlang = () => {
    setLoading(true);
    setError("");
    muatTiket()
      .then((data) => setTiket(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Panggil muatUlang saat aplikasi pertama kali dibuka.
  useEffect(() => {
    muatUlang();
  }, []);

  const tambahTiket = (tiketBaru: Tiket) => {
    setTiket((tiketSaatIni) => [tiketBaru, ...tiketSaatIni]);
  };

  const ubahStatus = (id: string, status: Status) => {
    setTiket((tiketSaatIni) =>
      tiketSaatIni.map((item) => (item.id === id ? { ...item, status } : item)),
    );
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
