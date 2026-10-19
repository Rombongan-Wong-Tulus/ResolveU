import { Stack } from "expo-router";
import { TiketProvider } from "../context/TiketContext";
import { headerOptions } from "../constants/styles";

export default function Layout() {
  return (
    <TiketProvider>
      <Stack screenOptions={headerOptions}>
        <Stack.Screen name="index" options={{ title: "ResolveU" }} />
        <Stack.Screen name="buat" options={{ title: "Buat Tiket" }} />
      </Stack>
    </TiketProvider>
  );
}
