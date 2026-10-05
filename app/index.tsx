import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Kategori, Status, Tiket, tiketAwal } from "./constants/data";
import { colors, styles } from "./constants/styles";

const statusColor: Record<Status, string> = {
  Open: colors.open,
  Proses: colors.proses,
  Selesai: colors.selesai,
};

export default function Index() {
  const [tiket, setTiket] = useState<Tiket[]>(tiketAwal);
  const [nama, setNama] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");

  const kirimTiket = () => {
    const namaTrim = nama.trim();
    const ruanganTrim = ruangan.trim();
    const deskripsiTrim = deskripsi.trim();
    const kategoriTrim = kategori.trim();

    if (!namaTrim || !ruanganTrim || !deskripsiTrim || !kategoriTrim) {
      return;
    }

    if (!(["WiFi", "Komputer", "Printer", "Akun"] as string[]).includes(kategoriTrim)) {
      return;
    }

    const tiketBaru: Tiket = {
      id: Date.now().toString(),
      nama: namaTrim,
      ruangan: ruanganTrim,
      kategori: kategoriTrim as Kategori,
      deskripsi: deskripsiTrim,
      status: "Open",
    };

    setTiket((tiketSaatIni) => [tiketBaru, ...tiketSaatIni]);
    setNama("");
    setRuangan("");
    setDeskripsi("");
    setKategori("");
  };

  const renderTiketCard = ({ item }: { item: Tiket }) => (
    <View style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketName}>{item.nama}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor[item.status] }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.ticketDetail}>Ruangan: {item.ruangan}</Text>
      <Text style={styles.ticketDetail}>Kategori: {item.kategori}</Text>
      <Text style={styles.ticketDescription}>{item.deskripsi}</Text>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.container}
        data={tiket}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>ResolveU</Text>
              <Text style={styles.subtitle}>Helpdesk IT Kampus</Text>
            </View>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Buat tiket baru</Text>
              <TextInput
                placeholder="Nama pelapor"
                placeholderTextColor={colors.inkSubtle}
                style={styles.input}
                value={nama}
                onChangeText={setNama}
              />
              <TextInput
                placeholder="Ruangan"
                placeholderTextColor={colors.inkSubtle}
                style={styles.input}
                value={ruangan}
                onChangeText={setRuangan}
              />
              <TextInput
                placeholder="Deskripsi masalah"
                placeholderTextColor={colors.inkSubtle}
                multiline
                style={[styles.input, styles.descriptionInput]}
                value={deskripsi}
                onChangeText={setDeskripsi}
              />
              <TextInput
                placeholder="Kategori: WiFi, Komputer, Printer, atau Akun"
                placeholderTextColor={colors.inkSubtle}
                style={styles.input}
                value={kategori}
                onChangeText={setKategori}
              />
              <Pressable
                accessibilityRole="button"
                onPress={kirimTiket}
                style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
              >
                <Text style={styles.submitText}>Kirim Tiket</Text>
              </Pressable>
            </View>
            <Text style={styles.listTitle}>Daftar Tiket</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada tiket.</Text>}
        renderItem={renderTiketCard}
      />
    </View>
  );
}
