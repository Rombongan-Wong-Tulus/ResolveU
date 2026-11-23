import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { supabase } from "../../services/supabase";
import { useTema } from "../../context/ThemeContext";

export default function Login() {
  const { styles, colors } = useTema();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const result = isRegistering
        ? await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { data: { nama: nama.trim(), role: "mahasiswa" } },
          })
        : await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
      if (result.error) setErrorMsg(result.error.message);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.authContent}>
        <View style={styles.authBrand}>
          <Text style={styles.authTitle}>ResolveU</Text>
          <Text style={styles.authSubtitle}>
            {isRegistering
              ? "Buat akun untuk mengirim laporan IT kampus"
              : "Masuk untuk mengelola laporan IT kampus"}
          </Text>
        </View>
        <View style={styles.authForm}>
          {isRegistering && (
            <TextInput
              placeholder="Nama"
              placeholderTextColor={colors.inkSubtle}
              style={styles.input}
              value={nama}
              onChangeText={setNama}
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
          {errorMsg.length > 0 && <Text style={styles.errorText}>{errorMsg}</Text>}
          <Pressable
            accessibilityRole="button"
            disabled={loading}
            onPress={submit}
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          >
            {loading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.submitText}>{isRegistering ? "Daftar" : "Masuk"}</Text>
            )}
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsRegistering((value) => !value)}
          style={styles.authToggle}
        >
          <Text style={styles.linkText}>
            {isRegistering ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
