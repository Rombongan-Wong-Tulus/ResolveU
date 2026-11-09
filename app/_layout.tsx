import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";
import { TiketProvider } from "../context/TiketContext";
import { ThemeProvider, useTema } from "../context/ThemeContext";
import { buatHeaderOptions } from "../constants/styles";

// Tombol kecil di header untuk berpindah tema terang/gelap.
function TombolTema() {
  const { darkMode, toggleTema, styles } = useTema();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={toggleTema}
      style={styles.themeButton}
    >
      <Text style={styles.themeButtonText}>
        {darkMode ? "Mode Terang" : "Mode Gelap"}
      </Text>
    </Pressable>
  );
}

// Komponen dalam: butuh useTema() sehingga berada di dalam ThemeProvider.
function StackTema() {
  const { darkMode, colors } = useTema();

  return (
    <>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Stack screenOptions={buatHeaderOptions(colors)}>
        <Stack.Screen
          name="index"
          options={{
            title: "ResolveU",
            headerRight: () => <TombolTema />,
          }}
        />
        <Stack.Screen
          name="buat"
          options={{ title: "Buat Tiket", presentation: "modal" }}
        />
        <Stack.Screen name="tiket/[id]" options={{ title: "Detail Tiket" }} />
        <Stack.Screen
          name="[...unmatched]"
          options={{ title: "Tidak Ditemukan" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TiketProvider>
        <StackTema />
      </TiketProvider>
    </ThemeProvider>
  );
}
