import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTema } from "../../context/ThemeContext";
import { buatHeaderOptions } from "../../constants/styles";

function HeaderActions() {
  const { signOut } = useAuth();
  const { darkMode, toggleTema, styles } = useTema();
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Pressable accessibilityRole="button" onPress={toggleTema} style={styles.themeButton}>
        <Text style={styles.themeButtonText}>{darkMode ? "Mode Terang" : "Mode Gelap"}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={signOut} style={styles.themeButton}>
        <Text style={styles.themeButtonText}>Keluar</Text>
      </Pressable>
    </View>
  );
}

export default function AppLayout() {
  const { colors } = useTema();
  return (
    <Stack screenOptions={buatHeaderOptions(colors)}>
      <Stack.Screen name="index" options={{ title: "ResolveU", headerRight: () => <HeaderActions /> }} />
      <Stack.Screen name="buat" options={{ title: "Buat Tiket", presentation: "modal" }} />
      <Stack.Screen name="tiket/[id]" options={{ title: "Detail Tiket" }} />
    </Stack>
  );
}
