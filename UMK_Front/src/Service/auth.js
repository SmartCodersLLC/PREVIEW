import http from "./http";

const login = async ({ login, password }) =>
  await http.post("auth/login", { login, password });

const check = async () => await http.post("auth/check");

const logout = async () => await http.get("auth/logout");

export const AuthService = {
  login,
  check,
  logout,
};
