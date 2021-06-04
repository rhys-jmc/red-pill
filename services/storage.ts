import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeStorage = <T extends Record<string, unknown>>(
  key: string,
  initial: T
): {
  readonly get: () => Promise<T>;
  readonly set: (value: T) => Promise<void>;
} => ({
  get: async () => {
    const item = await AsyncStorage.getItem(key);
    return item === null ? initial : JSON.parse(item);
  },

  set: async (value: T) => AsyncStorage.setItem(key, JSON.stringify(value)),
});
