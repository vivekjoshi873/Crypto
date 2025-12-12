export const safeWindow = typeof window !== "undefined";

export function readStorage<T>(key: string, fallback: T): T {
  if (!safeWindow) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (err) {
    console.error("Failed to read storage", err);
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (!safeWindow) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to write storage", err);
  }
}
