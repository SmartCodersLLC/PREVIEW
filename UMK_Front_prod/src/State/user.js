// Imports
import { atom } from "recoil";

const userDefault = {
  isAuthenticated: false,
  isLoading: false,
  data: null,
};

export const userState = atom({
  key: "userState",
  default: userDefault,
});
