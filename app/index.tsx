import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { isKategori, KATEGORI, Kategori, Status, Tiket, tiketAwal } from "../constants/data";
import { colors, styles } from "../constants/styles";

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

function getErrorMsg(form: FormTiket): string {
  if (!form.nama.trim()) return "Nama pelapor tidak boleh kosong.";
  if (!form.ruangan.trim()) return "Ruangan tidak boleh kosong.";
  if (!form.deskripsi.trim()) return "Deskripsi masalah tidak boleh kosong.";
  if (!isKategori(form.kategori)) return "Pilih salah satu kategori yang tersedia.";
  return "";
}

function formValid(form: FormTiket): boolean {
  return Boolean(
    form.nama.trim() &&
      form.ruangan.trim() &&
      form.deskripsi.trim() &&
      isKategori(form.kategori),
  );
}

function buatTiket(form: FormTiket, kategori: Kategori): Tiket {
  return {
    id: Date.now().toString(),
    nama: form.nama.trim(),
    ruangan: form.ruangan.trim(),
    deskripsi: form.deskripsi.trim(),
    kategori,
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
  const [kategoriTerbuka, setKategoriTerbuka] = useState(false);

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
      <View style={styles.categoryField}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: kategoriTerbuka }}
          onPress={() => setKategoriTerbuka((isOpen) => !isOpen)}
          style={styles.categorySelector}
        >
          <Text style={form.kategori ? styles.categorySelectedText : styles.categoryPlaceholderText}>
            {form.kategori || "Pilih kategori"}
          </Text>
        </Pressable>
        {kategoriTerbuka && (
          <View style={styles.categoryOptions}>
            <FlatList
              data={KATEGORI}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    onChange("kategori", item);
                    setKategoriTerbuka(false);
                  }}
                  style={[
                    styles.categoryOption,
                    form.kategori === item && styles.categoryOptionSelected,
                  ]}
                >
                  <Text style={styles.categoryOptionText}>{item}</Text>
                </Pressable>
              )}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
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
    const kategori = form.kategori;
    if (!valid || !isKategori(kategori)) return;

    setTiket((currentTiket) => [buatTiket(form, kategori), ...currentTiket]);
    setForm(FORM_AWAL);
    setSubmitted(false);
  };

  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
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
    </SafeAreaProvider>
  );
}