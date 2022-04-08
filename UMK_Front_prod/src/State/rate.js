// Imports
import { atom } from "recoil";

const defaultRate = { value: 0, label: "Выберите курс" };

const rateListDefault = [
  { value: 1, label: "selector.rate1" },
  { value: 2, label: "selector.rate2" },
  { value: 3, label: "selector.rate3" },
  { value: 4, label: "selector.rate4" },
  { value: 5, label: "selector.rate5" },
  { value: 6, label: "selector.rate6" },
];

export const rateListState = atom({
  key: "rateListState",
  default: [defaultRate, ...rateListDefault],
});

export const defaultRateState = atom({
  key: "defaultRateState",
  default: defaultRate,
});

export const selectedRateState = atom({
  key: "selectedRateState",
  default: defaultRate,
});
