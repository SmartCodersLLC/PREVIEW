// Imports
import { atom } from "recoil";

const MONTH = new Date().getMonth();

const SPRING_SEASON_ID = 1;
const FALL_SEASON_ID = 2;
const SUMMER_SEASON_ID = 3;

const wsListDefault = [
  { value: FALL_SEASON_ID, label: "selector.FallSemester" },
  { value: SPRING_SEASON_ID, label: "selector.SpringSemester" },
  { value: SUMMER_SEASON_ID, label: "selector.SummerSemester" },
];

const defaultWs = MONTH < 8 ? SPRING_SEASON_ID : FALL_SEASON_ID;

export const wsListState = atom({
  key: "wsListState",
  default: wsListDefault,
});

export const defaultWsState = atom({
  key: "defaultWsState",
  default: defaultWs,
});

export const selectedWsState = atom({
  key: "selectedWsState",
  default: defaultWs,
});
