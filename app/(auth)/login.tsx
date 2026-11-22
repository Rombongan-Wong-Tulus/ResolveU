import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../services/supabase";
import { useTema } from "../../context/ThemeContext";

function pesanError(error: unknown) {
  const message = error instanceof Error ? error.message : "Terjadi kesalahan. Coba lagi.";
  if (message.toLowerCase().includes("invalid login credentials")) {
    return "Email atau kata sandi salah.";
  }
  if (message.toLowerCase().includes("user already registered")) {
    return "Email sudah terdaftar.";
  }
  return "Autentikasi gagal. Periksa data dan coba lagi.";
}

export default function Login() {
  const { styles, colors } = useTema();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    const namaTrimmed = nama.trim();
    const emailTrimmed = email.trim();
    setError("");
    if ((isRegistering && !namaTrimmed) || !emailTrimmed || !password) {
      setError(isRegistering ? "Nama, email, dan kata sandi wajib diisi." : "Email dan kata sandi wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        const { error: authError } = await supabase.auth.signUp({
          email: emailTrimmed,
          password,
          options: { data: { nama: namaTrimmed, role: "pelapor" } },
        });
        if (authError) throw authError;
        setError("Pendaftaran berhasil. Silakan masuk.");
        setIsRegistering(false);
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: emailTrimmed,
          password,
        });
        if (authError) throw authError;
      }
    } catch (authError) {
      setError(pesanError(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>{isRegistering ? "Daftar" : "Masuk"}</Text>
          <Text style={styles.loginSubtitle}>Kelola tiket IT kampus dengan aman.</Text>
          {isRegistering && (
            <TextInput
              placeholder="Nama"
              placeholderTextColor={colors.inkSubtle}
              style={styles.input}
              value={nama}
              onChangeText={setNama}
              autoCapitalize="words"
            />
          )}
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.inkSubtle}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            placeholder="Kata sandi"
            placeholderTextColor={colors.inkSubtle}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
          <Pressable
            accessibilityRole="button"
            disabled={loading}
            onPress={handleAuth}
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          >
            {loading ? <ActivityIndicator color={colors.onPrimary} /> : <Text style={styles.submitText}>{isRegistering ? "Daftar" : "Masuk"}</Text>}
          </Pressable>
          <Pressable style={styles.loginToggle} disabled={loading} onPress={() => { setError(""); setIsRegistering((value) => !value); }}>
            <Text style={styles.linkText}>{isRegistering ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar di sini"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
