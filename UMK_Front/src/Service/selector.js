import http from "./http";

const kafedraList = async ({ year }) =>
  await http.post("select/kafedra/list", { year });

const yearList = async () => await http.post("select/year/list", {});

const yearDefault = async () => await http.post("select/year/default", {});

export const SelectorService = {
  kafedraList,
  yearList,
  yearDefault,
};
