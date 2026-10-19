import { useEffect, useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { isStatus, STATUS, Status, Tiket } from "../constants/data";
import { useTiket } from "../context/TiketContext";
import { STATUS_COLORS, styles } from "../constants/styles";

const OPSI_FILTER = ["Semua", ...STATUS] as const;
type FilterStatus = (typeof OPSI_FILTER)[number];
function KartuTiket({ item }: { item: Tiket }) {
  const router = useRouter();
  // Router membuka halaman detail sesuai id tiket yang ditekan.
  return <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: "/tiket/[id]", params: { id: item.id } })} style={styles.ticketCard}><View style={styles.ticketHeader}><Text style={styles.ticketName}>{item.nama}</Text><View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] }]}><Text style={styles.statusText}>{item.status}</Text></View></View><Text style={styles.ticketDetail}>Ruangan: {item.ruangan}</Text><Text style={styles.ticketDetail}>Kategori: {item.kategori}</Text><Text style={styles.ticketDescription}>{item.deskripsi}</Text></Pressable>;
}
export default function Index() {
  const router = useRouter();
  // Hook membaca filter status dari query param, misal /?status=Open.
  const { status } = useLocalSearchParams<{ status?: string }>();
  const { tiket, pesan, setPesan } = useTiket();
  // Hook menghilangkan notifikasi setelah 2,5 detik dan membatalkan timer saat pesan berubah.
  useEffect(() => {
    if (!pesan) return;
    const timer = setTimeout(() => setPesan(""), 2500);
    return () => clearTimeout(timer);
  }, [pesan]);
  // Nilai filter divalidasi dengan isStatus; tidak valid dianggap "Semua".
  const filterAktif: FilterStatus = status !== undefined && isStatus(status) ? status : "Semua";
  // Hook menghitung daftar tiket sesuai filter dan jumlah tiap status.
  const tiketTersaring = useMemo(() => (filterAktif === "Semua" ? tiket : tiket.filter((item) => item.status === filterAktif)), [tiket, filterAktif]);
  const jumlahPerStatus = useMemo(() => {
    const jumlah: Record<Status, number> = { Open: 0, Proses: 0, Selesai: 0 };
    for (const item of tiket) jumlah[item.status] += 1;
    return jumlah;
  }, [tiket]);
  // Router menyimpan pilihan filter ke query param ("Semua" menghapus filter).
  const pilihFilter = (pilihan: FilterStatus) => {
    router.setParams({ status: pilihan === "Semua" ? undefined : pilihan });
  };
  // Router membuka halaman form pembuatan tiket.
  return <SafeAreaView edges={["bottom"]} style={styles.safeArea}><FlatList style={styles.safeArea} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container} data={tiketTersaring} keyExtractor={(item) => item.id} ListHeaderComponent={<View><View style={styles.header}><Text style={styles.title}>ResolveU</Text><Text style={styles.subtitle}>Helpdesk IT Kampus</Text></View>{pesan.length > 0 && <View style={styles.notificationBanner}><Text style={styles.notificationText}>{pesan}</Text></View>}<Pressable accessibilityRole="button" onPress={() => router.push("/buat")} style={styles.submitButton}><Text style={styles.submitText}>Buat Tiket</Text></Pressable><Text style={styles.listTitle}>Daftar Tiket</Text><FlatList horizontal showsHorizontalScrollIndicator={false} data={OPSI_FILTER} keyExtractor={(item) => item} contentContainerStyle={styles.filterContent} renderItem={({ item }) => <Pressable accessibilityRole="button" onPress={() => pilihFilter(item)} style={[styles.filterOption, filterAktif === item && styles.filterOptionActive]}><Text style={[styles.filterOptionText, filterAktif === item && styles.filterOptionTextActive]}>{item}</Text></Pressable>} /><Text style={styles.filterSummary}>Open {jumlahPerStatus.Open}, Proses {jumlahPerStatus.Proses}, Selesai {jumlahPerStatus.Selesai}</Text></View>} ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada tiket dengan status ini.</Text>} renderItem={({ item }) => <KartuTiket item={item} />} /></SafeAreaView>;
}
