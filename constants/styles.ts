import { StyleSheet } from "react-native";
import { Status } from "./data";

// Palet gelap: acuan warna dari DESIGN.md.
export const colorsDark = {
  canvas: "#010102",
  surface1: "#0f1011",
  surface2: "#141516",
  ink: "#f7f8f8",
  inkMuted: "#d0d6e0",
  inkSubtle: "#8a8f98",
  primary: "#5e6ad2",
  onPrimary: "#ffffff",
  hairline: "#23252a",
  open: "#ef4444",
  proses: "#f59e0b",
  selesai: "#27a644",
};

// Palet terang: turunan palet gelap untuk fitur light mode.
export const colorsLight = {
  canvas: "#f7f8f8",
  surface1: "#ffffff",
  surface2: "#eef0f3",
  ink: "#0f1011",
  inkMuted: "#3b3f46",
  inkSubtle: "#62666d",
  primary: "#5e6ad2",
  onPrimary: "#ffffff",
  hairline: "#dfe2e8",
  open: "#ef4444",
  proses: "#f59e0b",
  selesai: "#27a644",
};

// Tipe ini memastikan kedua palet selalu punya kunci yang sama.
export type Palet = typeof colorsDark;

// Semua style memakai palet aktif, jadi dibuat per tema.
export function buatStyles(colors: Palet) {
  return StyleSheet.create({
    safeAreaProvider: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.canvas,
    },
    container: {
      padding: 20,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      color: colors.ink,
      fontSize: 22,
      fontWeight: "600",
      letterSpacing: -0.4,
    },
    subtitle: {
      marginTop: 4,
      color: colors.inkSubtle,
      fontSize: 14,
      fontWeight: "400",
    },
    formCard: {
      padding: 16,
      marginBottom: 24,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 12,
    },
    formTitle: {
      marginBottom: 12,
      color: colors.ink,
      fontSize: 16,
      fontWeight: "600",
    },
    input: {
      minHeight: 48,
      marginBottom: 12,
      padding: 12,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 8,
      color: colors.ink,
      fontSize: 16,
    },
    categoryField: {
      marginBottom: 12,
    },
    categorySelector: {
      minHeight: 48,
      justifyContent: "center",
      padding: 12,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 8,
    },
    categoryPlaceholderText: {
      color: colors.inkSubtle,
      fontSize: 16,
    },
    categorySelectedText: {
      color: colors.ink,
      fontSize: 16,
    },
    categoryOptions: {
      marginTop: 8,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 8,
      overflow: "hidden",
    },
    categoryOption: {
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.hairline,
    },
    categoryOptionSelected: {
      backgroundColor: colors.surface2,
    },
    categoryOptionText: {
      color: colors.ink,
      fontSize: 16,
    },
    descriptionInput: {
      minHeight: 88,
      textAlignVertical: "top",
    },
    submitButton: {
      minHeight: 48,
      alignItems: "center",
      justifyContent: "center",
      padding: 14,
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
    submitText: {
      color: colors.onPrimary,
      fontSize: 14,
      fontWeight: "600",
    },
    listTitle: {
      marginBottom: 12,
      color: colors.ink,
      fontSize: 18,
      fontWeight: "600",
    },
    ticketCard: {
      padding: 16,
      marginBottom: 12,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 12,
    },
    ticketHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    ticketName: {
      flex: 1,
      marginRight: 12,
      color: colors.ink,
      fontSize: 16,
      fontWeight: "600",
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 9999,
    },
    statusText: {
      color: colors.onPrimary,
      fontSize: 12,
      fontWeight: "600",
    },
    ticketDetail: {
      marginBottom: 6,
      color: colors.inkMuted,
      fontSize: 14,
    },
    ticketDescription: {
      color: colors.ink,
      fontSize: 16,
      lineHeight: 24,
    },
    emptyText: {
      color: colors.inkSubtle,
      fontSize: 14,
    },
    errorText: {
      marginBottom: 10,
      color: colors.open,
      fontSize: 13,
      fontWeight: "500",
    },
    submitButtonDisabled: {
      opacity: 0.45,
    },
    filterContent: {
      gap: 8,
      paddingVertical: 4,
    },
    filterOption: {
      minHeight: 36,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 14,
      paddingVertical: 6,
      backgroundColor: colors.canvas,
      borderWidth: 1,
      borderColor: colors.canvas,
      borderRadius: 9999,
    },
    filterOptionActive: {
      backgroundColor: colors.surface2,
      borderColor: colors.hairline,
    },
    filterOptionText: {
      color: colors.inkSubtle,
      fontSize: 14,
      fontWeight: "500",
    },
    filterOptionTextActive: {
      color: colors.ink,
    },
    filterSummary: {
      marginTop: 8,
      marginBottom: 12,
      color: colors.inkMuted,
      fontSize: 12,
    },
    notificationBanner: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 8,
    },
    notificationText: {
      color: colors.ink,
      fontSize: 14,
    },
    deskripsiBlock: {
      marginTop: 12,
    },
    buttonColumn: {
      marginTop: 16,
      gap: 12,
    },
    secondaryButton: {
      minHeight: 48,
      alignItems: "center",
      justifyContent: "center",
      padding: 14,
      backgroundColor: colors.surface1,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 8,
    },
    secondaryText: {
      color: colors.ink,
      fontSize: 14,
      fontWeight: "600",
    },
    centeredContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: 20,
    },
    linkText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "600",
    },
    themeButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: 8,
    },
    themeButtonText: {
      color: colors.inkMuted,
      fontSize: 14,
      fontWeight: "600",
    },
  });
}

// Opsi header mengikuti palet aktif, tanpa shadow dan tanpa garis tebal.
export function buatHeaderOptions(colors: Palet) {
  return {
    headerStyle: { backgroundColor: colors.canvas },
    headerTintColor: colors.ink,
    headerTitleStyle: { color: colors.ink },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.canvas },
  };
}

// Warna badge per status (sama di tema gelap dan terang).
export const STATUS_COLORS: Record<Status, string> = {
  Open: colorsDark.open,
  Proses: colorsDark.proses,
  Selesai: colorsDark.selesai,
};
