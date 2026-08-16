import { StateStorage } from 'zustand/middleware';

const { MMKV } = require('react-native-mmkv');

export const storage = new MMKV();

export const zustandMmkvStorage: StateStorage = {
  getItem: name => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: name => storage.delete(name),
};
