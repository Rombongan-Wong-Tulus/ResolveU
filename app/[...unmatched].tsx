import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../constants/styles";

export default function HalamanTidakDitemukan() {
  // Hook membaca segmen URL yang tidak cocok dengan route aplikasi.
  const { unmatched } = useLocalSearchParams<{ unmatched: string[] }>();
  const path = Array.isArray(unmatched) ? `/${unmatched.join("/")}` : "/";
  const router = useRouter();
  // Router mengganti URL yang tidak dikenal dengan halaman utama.
  const kembaliKeBeranda = () => router.replace("/");

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>Halaman tidak ditemukan</Text>
        <Text style={styles.emptyText}>Path yang diminta: {path}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={kembaliKeBeranda}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Kembali ke Beranda</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
