import { createContext, useContext, useState, type ReactNode } from "react";
import { Status, Tiket, tiketAwal } from "../constants/data";

interface TiketContextValue {
  tiket: Tiket[];
  tambahTiket: (tiket: Tiket) => void;
  ubahStatus: (id: string, status: Status) => void;
}

const TiketContext = createContext<TiketContextValue | undefined>(undefined);

export function TiketProvider({ children }: { children: ReactNode }) {
  const [tiket, setTiket] = useState<Tiket[]>(tiketAwal);

  const tambahTiket = (tiketBaru: Tiket) => {
    setTiket((tiketSaatIni) => [tiketBaru, ...tiketSaatIni]);
  };

  const ubahStatus = (id: string, status: Status) => {
    setTiket((tiketSaatIni) =>
      tiketSaatIni.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  return (
    <TiketContext.Provider value={{ tiket, tambahTiket, ubahStatus }}>
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
