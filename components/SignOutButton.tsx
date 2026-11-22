import { Pressable, Text } from "react-native";
import { supabase } from "../services/supabase";
import { useTema } from "../context/ThemeContext";

export default function SignOutButton() {
  const { styles } = useTema();
  return (
    <Pressable accessibilityRole="button" onPress={() => void supabase.auth.signOut()} style={styles.signOutButton}>
      <Text style={styles.signOutText}>Keluar</Text>
    </Pressable>
  );
}
