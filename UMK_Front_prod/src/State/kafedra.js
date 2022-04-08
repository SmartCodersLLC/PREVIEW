// Imports
import { atom } from "recoil";

const defaultKafedra = { value: 0, label: "Выберите кафедру" };

export const kafedraListState = atom({
  key: "kafedraListState",
  default: [defaultKafedra],
});

export const defaultKafedraState = atom({
  key: "defaultKafedraState",
  default: defaultKafedra,
});

export const selectedKafedraState = atom({
  key: "selectedKafedraState",
  default: defaultKafedra,
});
