import { ActivityIndicator, Text, View } from "react-native";
import { useTema } from "../context/ThemeContext";

export function Loading({ pesan = "Memuat tiket..." }: { pesan?: string }) {
  const { styles, colors } = useTema();

  // Tampilkan indikator dan pesan di tengah layar.
  return (
    <View style={styles.centeredContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>{pesan}</Text>
    </View>
  );
}
