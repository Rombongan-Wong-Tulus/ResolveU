import { Redirect, Stack, useSegments } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  if (!isLoading && session && segments[0] === "(auth)") return <Redirect href="/" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
