// Imports
import { atom } from "recoil";

export const umkListState = atom({
  key: "umkListState",
  default: [],
});

export const selectedUmkState = atom({
  key: "selectedUmkState",
  default: null,
});

export const umkDetailListState = atom({
  key: "umkDetailListState",
  default: [],
});