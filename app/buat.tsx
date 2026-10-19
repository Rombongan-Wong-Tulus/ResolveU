import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { isKategori, KATEGORI, Kategori, Tiket } from "../constants/data";
import { useTiket } from "../context/TiketContext";
import { colors, styles } from "../constants/styles";

interface FormTiket { nama: string; ruangan: string; deskripsi: string; kategori: string; }
const FORM_AWAL: FormTiket = { nama: "", ruangan: "", deskripsi: "", kategori: "" };
function getErrorMsg(form: FormTiket): string {
  if (!form.nama.trim()) return "Nama pelapor tidak boleh kosong.";
  if (!form.ruangan.trim()) return "Ruangan tidak boleh kosong.";
  if (!form.deskripsi.trim()) return "Deskripsi masalah tidak boleh kosong.";
  if (!isKategori(form.kategori)) return "Pilih salah satu kategori yang tersedia.";
  return "";
}
function formValid(form: FormTiket) { return Boolean(form.nama.trim() && form.ruangan.trim() && form.deskripsi.trim() && isKategori(form.kategori)); }
function buatTiket(form: FormTiket, kategori: Kategori): Tiket {
  return { id: Date.now().toString(), nama: form.nama.trim(), ruangan: form.ruangan.trim(), deskripsi: form.deskripsi.trim(), kategori, status: "Open" };
}
function FormTiketView({ form, onChange, onSubmit, onCancel, isValid, errorMsg }: { form: FormTiket; onChange: (field: keyof FormTiket, value: string) => void; onSubmit: () => void; onCancel: () => void; isValid: boolean; errorMsg: string }) {
  const [kategoriTerbuka, setKategoriTerbuka] = useState(false);
  return <View style={styles.formCard}>
    <Text style={styles.formTitle}>Buat tiket baru</Text>
    <TextInput placeholder="Nama pelapor" placeholderTextColor={colors.inkSubtle} style={styles.input} value={form.nama} onChangeText={(v) => onChange("nama", v)} />
    <TextInput placeholder="Ruangan" placeholderTextColor={colors.inkSubtle} style={styles.input} value={form.ruangan} onChangeText={(v) => onChange("ruangan", v)} />
    <TextInput placeholder="Deskripsi masalah" placeholderTextColor={colors.inkSubtle} multiline style={[styles.input, styles.descriptionInput]} value={form.deskripsi} onChangeText={(v) => onChange("deskripsi", v)} />
    <View style={styles.categoryField}><Pressable accessibilityRole="button" accessibilityState={{ expanded: kategoriTerbuka }} onPress={() => setKategoriTerbuka((v) => !v)} style={styles.categorySelector}><Text style={form.kategori ? styles.categorySelectedText : styles.categoryPlaceholderText}>{form.kategori || "Pilih kategori"}</Text></Pressable>
      {kategoriTerbuka && <View style={styles.categoryOptions}><FlatList data={KATEGORI} keyExtractor={(item) => item} renderItem={({ item }) => <Pressable accessibilityRole="button" onPress={() => { onChange("kategori", item); setKategoriTerbuka(false); }} style={[styles.categoryOption, form.kategori === item && styles.categoryOptionSelected]}><Text style={styles.categoryOptionText}>{item}</Text></Pressable>} scrollEnabled={false} /></View>}
    </View>
    {errorMsg.length > 0 && <Text style={styles.errorText}>{errorMsg}</Text>}
    <View style={styles.buttonColumn}>
      <Pressable accessibilityRole="button" onPress={onSubmit} style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}><Text style={styles.submitText}>Kirim Tiket</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={onCancel} style={styles.secondaryButton}><Text style={styles.secondaryText}>Batal</Text></Pressable>
    </View>
  </View>;
}
export default function Buat() {
  const router = useRouter();
  const { tambahTiket, setPesan } = useTiket();
  const [form, setForm] = useState<FormTiket>(FORM_AWAL);
  const [submitted, setSubmitted] = useState(false);
  // Hook menghapus error setelah pengguna mulai memperbaiki form.
  useEffect(() => {
    if (submitted) setSubmitted(false);
  }, [form]);
  const valid = formValid(form);
  const updateForm = (field: keyof FormTiket, value: string) => setForm((current) => ({ ...current, [field]: value }));
  // Router menutup modal setelah tiket valid ditambahkan.
  const kirimTiket = () => {
    setSubmitted(true);
    if (!valid || !isKategori(form.kategori)) return;
    tambahTiket(buatTiket(form, form.kategori));
    setPesan("Tiket berhasil dikirim");
    router.dismiss();
  };
  // Router membatalkan pembuatan dengan menutup modal.
  const batal = () => router.dismiss();
  return <SafeAreaView edges={["bottom"]} style={styles.safeArea}><View style={styles.container}><FormTiketView form={form} onChange={updateForm} onSubmit={kirimTiket} onCancel={batal} isValid={valid} errorMsg={submitted ? getErrorMsg(form) : ""} /></View></SafeAreaView>;
}
