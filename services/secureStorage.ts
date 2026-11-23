import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN_KEY = "resolveu-auth-token";
const CHUNK_PREFIX = "resolveu-chunk-v1";
const MAX_CHUNK_BYTES = 1800;

function nativeKey(key: string): string {
  const encoded = Array.from(key, (character) =>
    (character.codePointAt(0) ?? 0).toString(16),
  ).join("-");
  return `resolveu-${encoded}`;
}

function splitUtf8(value: string): string[] {
  const chunks: string[] = [];
  let chunk = "";
  let chunkBytes = 0;

  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    const characterBytes =
      codePoint <= 0x7f ? 1 : codePoint <= 0x7ff ? 2 : codePoint <= 0xffff ? 3 : 4;

    if (chunkBytes + characterBytes > MAX_CHUNK_BYTES) {
      chunks.push(chunk);
      chunk = "";
      chunkBytes = 0;
    }

    chunk += character;
    chunkBytes += characterBytes;
  }

  if (chunk.length > 0 || chunks.length === 0) {
    chunks.push(chunk);
  }

  return chunks;
}

function chunkCount(marker: string | null): number | null {
  if (!marker) return null;
  const match = marker.match(/^resolveu-chunk-v1\.\d+-\d+\.(\d+)$/);
  if (!match) return null;

  const count = Number(match[1]);
  return Number.isSafeInteger(count) && count > 0 ? count : null;
}

async function getNativeValue(key: string): Promise<string | null> {
  const baseKey = nativeKey(key);
  const marker = await SecureStore.getItemAsync(baseKey);
  const count = chunkCount(marker);

  if (count === null) return marker;

  const generation = marker?.split(".")[1];
  if (!generation) {
    throw new Error("Format penyimpanan sesi tidak valid.");
  }

  let value = "";
  for (let index = 0; index < count; index += 1) {
    const chunk = await SecureStore.getItemAsync(
      `${baseKey}.${generation}.${index}`,
    );
    if (chunk === null) {
      throw new Error("Data sesi tidak lengkap di SecureStore.");
    }
    value += chunk;
  }

  return value;
}

async function setNativeValue(key: string, value: string): Promise<void> {
  const baseKey = nativeKey(key);
  const previousMarker = await SecureStore.getItemAsync(baseKey);
  const previousCount = chunkCount(previousMarker);
  const previousGeneration = previousMarker?.split(".")[1];
  const generation = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
  const chunks = splitUtf8(value);

  for (let index = 0; index < chunks.length; index += 1) {
    await SecureStore.setItemAsync(
      `${baseKey}.${generation}.${index}`,
      chunks[index],
    );
  }

  await SecureStore.setItemAsync(
    baseKey,
    `${CHUNK_PREFIX}.${generation}.${chunks.length}`,
  );

  if (previousCount !== null && previousGeneration) {
    for (let index = 0; index < previousCount; index += 1) {
      await SecureStore.deleteItemAsync(
        `${baseKey}.${previousGeneration}.${index}`,
      );
    }
  }
}

async function deleteNativeValue(key: string): Promise<void> {
  const baseKey = nativeKey(key);
  const marker = await SecureStore.getItemAsync(baseKey);
  const count = chunkCount(marker);
  const generation = marker?.split(".")[1];

  await SecureStore.deleteItemAsync(baseKey);

  if (count !== null && generation) {
    for (let index = 0; index < count; index += 1) {
      await SecureStore.deleteItemAsync(`${baseKey}.${generation}.${index}`);
    }
  }
}

function webKey(key: string): string {
  if (typeof localStorage === "undefined") {
    throw new Error("Penyimpanan browser tidak tersedia.");
  }
  return `resolveu:${key}`;
}

export async function saveAuthToken(token: string): Promise<void> {
  if (Platform.OS === "web") {
    const key = webKey(AUTH_TOKEN_KEY);
    localStorage.setItem(key, token);
    return;
  }
  await setNativeValue(AUTH_TOKEN_KEY, token);
}

export async function getAuthToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    const key = webKey(AUTH_TOKEN_KEY);
    return localStorage.getItem(key);
  }
  return getNativeValue(AUTH_TOKEN_KEY);
}

export async function deleteAuthToken(): Promise<void> {
  if (Platform.OS === "web") {
    const key = webKey(AUTH_TOKEN_KEY);
    localStorage.removeItem(key);
    return;
  }
  await deleteNativeValue(AUTH_TOKEN_KEY);
}

export const ExpoSecureStoreAdapter = {
  getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      const storageKey = webKey(key);
      return Promise.resolve(localStorage.getItem(storageKey));
    }
    return getNativeValue(key);
  },
  setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      const storageKey = webKey(key);
      localStorage.setItem(storageKey, value);
      return Promise.resolve();
    }
    return setNativeValue(key, value);
  },
  removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      const storageKey = webKey(key);
      localStorage.removeItem(storageKey);
      return Promise.resolve();
    }
    return deleteNativeValue(key);
  },
};
