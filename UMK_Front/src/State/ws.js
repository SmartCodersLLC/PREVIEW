// Imports
import { atom } from "recoil";

const SPRING_SEASON_ID = 1;
const FALL_SEASON_ID = 2;
const SUMMER_SEASON_ID = 3;

const wsListDefault = [
  { value: FALL_SEASON_ID, label: "selector.FallSemester" },
  { value: SPRING_SEASON_ID, label: "selector.SpringSemester" },
  { value: SUMMER_SEASON_ID, label: "selector.SummerSemester" },
];

export const wsListState = atom({
  key: "wsListState",
  default: wsListDefault,
});

export const defaultWsState = atom({
  key: "defaultWsState",
  default: SPRING_SEASON_ID,
});

export const selectedWsState = atom({
  key: "selectedWsState",
  default: SPRING_SEASON_ID,
});
