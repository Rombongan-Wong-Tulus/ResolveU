import { Pressable, Text, View } from "react-native";
import { useTema } from "../context/ThemeContext";

export function ErrorMessage({
  pesan,
  onCoba,
}: {
  pesan: string;
  onCoba: () => void;
}) {
  const { styles } = useTema();

  // Tampilkan pesan dan tombol coba lagi di tengah layar.
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.errorText}>{pesan}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onCoba}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryText}>Coba Lagi</Text>
      </Pressable>
    </View>
  );
}
