import http from "./http";

const list = async ({ year, kafedra }) =>
  await http.post("umk/list", { year, kafedra });

export const UMKService = {
  list,
};
