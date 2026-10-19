import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Status, Tiket } from "../constants/data";
import { useTiket } from "../context/TiketContext";
import { colors, styles } from "../constants/styles";

const STATUS_COLORS: Record<Status, string> = { Open: colors.open, Proses: colors.proses, Selesai: colors.selesai };
function renderTiketCard({ item }: { item: Tiket }) {
  return <View style={styles.ticketCard}><View style={styles.ticketHeader}><Text style={styles.ticketName}>{item.nama}</Text><View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] }]}><Text style={styles.statusText}>{item.status}</Text></View></View><Text style={styles.ticketDetail}>Ruangan: {item.ruangan}</Text><Text style={styles.ticketDetail}>Kategori: {item.kategori}</Text><Text style={styles.ticketDescription}>{item.deskripsi}</Text></View>;
}
export default function Index() {
  const router = useRouter();
  const { tiket } = useTiket();
  // Router membuka halaman form pembuatan tiket.
  return <SafeAreaView edges={["bottom"]} style={styles.safeArea}><FlatList style={styles.safeArea} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container} data={tiket} keyExtractor={(item) => item.id} ListHeaderComponent={<View><View style={styles.header}><Text style={styles.title}>ResolveU</Text><Text style={styles.subtitle}>Helpdesk IT Kampus</Text></View><Pressable accessibilityRole="button" onPress={() => router.push("/buat")} style={styles.submitButton}><Text style={styles.submitText}>Buat Tiket</Text></Pressable><Text style={styles.listTitle}>Daftar Tiket</Text></View>} ListEmptyComponent={<Text style={styles.emptyText}>Belum ada tiket.</Text>} renderItem={renderTiketCard} /></SafeAreaView>;
}
