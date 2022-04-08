import http from "./http";

const list = async ({ year, kafedra, rate }) =>
  await http.post("umk/list", { year, kafedra, rate });

const detail = async ({ rate, id_typeUmk, id_discipline, id_teacher }) =>
  await http.post("umk/detail", {
    rate,
    id_discipline,
    id_typeUmk,
    id_teacher,
  });

export const UMKService = {
  list,
  detail,
};
