import { StyleSheet } from "react-native";

export const colors = {
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
} as const;

export const styles = StyleSheet.create({
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
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "500",
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
});
