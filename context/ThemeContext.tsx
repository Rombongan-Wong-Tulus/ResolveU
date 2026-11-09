import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import {
  buatStyles,
  colorsDark,
  colorsLight,
  type Palet,
} from "../constants/styles";

type ThemeContextValue = {
  darkMode: boolean;
  setDarkMode: (nilai: boolean) => void;
  toggleTema: () => void;
  colors: Palet;
  styles: ReturnType<typeof buatStyles>;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Skema tema perangkat; null berarti pengguna belum memilih tema sendiri.
  const skema = useColorScheme();
  const [pilihan, setPilihan] = useState<boolean | null>(null);
  const darkMode = pilihan ?? skema === "dark";

  // Context membuat tema dapat dibaca semua halaman tanpa meneruskan props.
  const colors = useMemo(
    () => (darkMode ? colorsDark : colorsLight),
    [darkMode],
  );
  const styles = useMemo(() => buatStyles(colors), [colors]);

  const setDarkMode = (nilai: boolean) => setPilihan(nilai);
  const toggleTema = () => setPilihan(!darkMode);

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode, toggleTema, colors, styles }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Hook untuk membaca tema dari context bersama.
export function useTema() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTema harus dipakai di dalam ThemeProvider");
  return context;
}
