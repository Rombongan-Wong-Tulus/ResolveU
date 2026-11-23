import { Redirect, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { TiketProvider } from "../context/TiketContext";
import { ThemeProvider, useTema } from "../context/ThemeContext";
import { buatHeaderOptions } from "../constants/styles";

// Tombol kecil di header untuk berpindah tema terang/gelap.
function TombolKeluar() {
  const { signOut } = useAuth();
  const { styles } = useTema();
  return <Pressable accessibilityRole="button" onPress={signOut} style={styles.themeButton}><Text style={styles.themeButtonText}>Keluar</Text></Pressable>;
}

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
function AuthGuard() {
  const segments = useSegments();
  const { isLoading, session } = useAuth();
  const inAuth = segments[0] === "(auth)" || segments[0] === "login";

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session && !inAuth) return <Redirect href="/login" />;
  if (session && inAuth) return <Redirect href="/" />;
  return <AuthenticatedStack />;
}

function AuthenticatedStack() {
  const { darkMode, colors } = useTema();

  return (
    <>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Stack screenOptions={buatHeaderOptions(colors)}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
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
      <AuthProvider>
        <TiketProvider>
          <AuthGuard />
        </TiketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
