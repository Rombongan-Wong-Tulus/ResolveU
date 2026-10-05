import { useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { isKategori, Kategori, Status, Tiket, tiketAwal } from "./constants/data";
import { colors, styles } from "./constants/styles";

const STATUS_COLORS: Record<Status, string> = {
  Open: colors.open,
  Proses: colors.proses,
  Selesai: colors.selesai,
};

interface FormTiket {
  nama: string;
  ruangan: string;
  deskripsi: string;
  kategori: string;
}

const FORM_AWAL: FormTiket = {
  nama: "",
  ruangan: "",
  deskripsi: "",
  kategori: "",
};

function normalizeKategori(value: string): string {
  const map: Record<string, string> = {
    wifi: "WiFi",
    komputer: "Komputer",
    printer: "Printer",
    akun: "Akun",
  };
  return map[value.toLowerCase().trim()] ?? value.trim();
}

function getErrorMsg(form: FormTiket): string {
  if (!form.nama.trim()) return "Nama pelapor tidak boleh kosong.";
  if (!form.ruangan.trim()) return "Ruangan tidak boleh kosong.";
  if (!form.deskripsi.trim()) return "Deskripsi masalah tidak boleh kosong.";
  if (!isKategori(normalizeKategori(form.kategori))) return "Kategori harus: WiFi, Komputer, Printer, atau Akun.";
  return "";
}

function formValid(form: FormTiket): boolean {
  return Boolean(
    form.nama.trim() &&
      form.ruangan.trim() &&
      form.deskripsi.trim() &&
      isKategori(normalizeKategori(form.kategori)),
  );
}

function buatTiket(form: FormTiket): Tiket {
  return {
    id: Date.now().toString(),
    nama: form.nama.trim(),
    ruangan: form.ruangan.trim(),
    deskripsi: form.deskripsi.trim(),
    kategori: normalizeKategori(form.kategori) as Kategori,
    status: "Open",
  };
}

function renderTiketCard({ item }: { item: Tiket }) {
  return (
    <View style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketName}>{item.nama}</Text>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.ticketDetail}>Ruangan: {item.ruangan}</Text>
      <Text style={styles.ticketDetail}>Kategori: {item.kategori}</Text>
      <Text style={styles.ticketDescription}>{item.deskripsi}</Text>
    </View>
  );
}

function FormTiketView({
  form,
  onChange,
  onSubmit,
  isValid,
  errorMsg,
}: {
  form: FormTiket;
  onChange: (field: keyof FormTiket, value: string) => void;
  onSubmit: () => void;
  isValid: boolean;
  errorMsg: string;
}) {
  return (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>Buat tiket baru</Text>
      <TextInput
        placeholder="Nama pelapor"
        placeholderTextColor={colors.inkSubtle}
        style={styles.input}
        value={form.nama}
        onChangeText={(value) => onChange("nama", value)}
      />
      <TextInput
        placeholder="Ruangan"
        placeholderTextColor={colors.inkSubtle}
        style={styles.input}
        value={form.ruangan}
        onChangeText={(value) => onChange("ruangan", value)}
      />
      <TextInput
        placeholder="Deskripsi masalah"
        placeholderTextColor={colors.inkSubtle}
        multiline
        style={[styles.input, styles.descriptionInput]}
        value={form.deskripsi}
        onChangeText={(value) => onChange("deskripsi", value)}
      />
      <TextInput
        placeholder="Kategori: WiFi, Komputer, Printer, atau Akun"
        placeholderTextColor={colors.inkSubtle}
        style={styles.input}
        value={form.kategori}
        onChangeText={(value) => onChange("kategori", value)}
      />
      {errorMsg.length > 0 && (
        <Text style={styles.errorText}>{errorMsg}</Text>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={onSubmit}
        style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
      >
        <Text style={styles.submitText}>Kirim Tiket</Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  const [tiket, setTiket] = useState<Tiket[]>(tiketAwal);
  const [form, setForm] = useState<FormTiket>(FORM_AWAL);
  const [submitted, setSubmitted] = useState(false);

  const valid = formValid(form);
  const errorMsg = submitted ? getErrorMsg(form) : "";

  const updateForm = (field: keyof FormTiket, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const kirimTiket = () => {
    setSubmitted(true);
    if (!valid) return;

    setTiket((currentTiket) => [buatTiket(form), ...currentTiket]);
    setForm(FORM_AWAL);
    setSubmitted(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        data={tiket}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>ResolveU</Text>
              <Text style={styles.subtitle}>Helpdesk IT Kampus</Text>
            </View>
            <FormTiketView
              form={form}
              onChange={updateForm}
              onSubmit={kirimTiket}
              isValid={valid}
              errorMsg={errorMsg}
            />
            <Text style={styles.listTitle}>Daftar Tiket</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada tiket.</Text>}
        renderItem={renderTiketCard}
      />
    </SafeAreaView>
  );
}
