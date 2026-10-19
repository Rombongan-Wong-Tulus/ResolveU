import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { statusBerikutnya } from "../../constants/data";
import { useTiket } from "../../context/TiketContext";
import { STATUS_COLORS, styles } from "../../constants/styles";

export default function DetailTiket() {
  // Hook mengambil id dari URL, misal /tiket/1 -> "1".
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tiket, ubahStatus, setPesan } = useTiket();
  const tiketDitemukan = tiket.find((item) => item.id === id);
  const statusSelanjutnya = tiketDitemukan ? statusBerikutnya(tiketDitemukan.status) : null;
  // Router kembali ke halaman sebelumnya; kalau tidak ada riwayat, ganti ke daftar.
  const kembali = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };
  // Status diperbarui bersama notifikasi untuk ditampilkan di daftar.
  const perbaruiStatus = () => {
    if (!tiketDitemukan || !statusSelanjutnya) return;
    ubahStatus(tiketDitemukan.id, statusSelanjutnya);
    setPesan("Status tiket diperbarui");
  };
  if (!tiketDitemukan) {
    return <SafeAreaView edges={["bottom"]} style={styles.safeArea}><View style={styles.centeredContainer}><Text style={styles.emptyText}>Tiket tidak ditemukan</Text><Pressable accessibilityRole="button" onPress={kembali} style={styles.secondaryButton}><Text style={styles.secondaryText}>Kembali</Text></Pressable></View></SafeAreaView>;
  }
  return <SafeAreaView edges={["bottom"]} style={styles.safeArea}><View style={styles.container}>
    <View style={styles.ticketCard}>
      <View style={styles.ticketHeader}><Text style={styles.ticketName}>{tiketDitemukan.nama}</Text><View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[tiketDitemukan.status] }]}><Text style={styles.statusText}>{tiketDitemukan.status}</Text></View></View>
      <Text style={styles.ticketDetail}>Ruangan: {tiketDitemukan.ruangan}</Text>
      <Text style={styles.ticketDetail}>Kategori: {tiketDitemukan.kategori}</Text>
      <View style={styles.deskripsiBlock}><Text style={styles.ticketDescription}>{tiketDitemukan.deskripsi}</Text></View>
    </View>
    <View style={styles.buttonColumn}>
      {statusSelanjutnya && <Pressable accessibilityRole="button" onPress={perbaruiStatus} style={styles.submitButton}><Text style={styles.submitText}>Ubah ke {statusSelanjutnya}</Text></Pressable>}
      <Pressable accessibilityRole="button" onPress={kembali} style={styles.secondaryButton}><Text style={styles.secondaryText}>Kembali</Text></Pressable>
    </View>
  </View></SafeAreaView>;
}
