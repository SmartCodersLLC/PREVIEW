const listSchema = {
  type: "object",
  properties: {
    year: { type: "number", required: true },
    rate: { type: "number", required: true },
    kafedra: { type: "number", required: true },
  },
};

const detailSchema = {
  type: "object",
  properties: {
    rate: { type: "number", required: true },
    id_typeUmk: { type: "number", required: true },
    id_discipline: { type: "number", required: true },
    id_teacher: { type: "number", required: true },
  },
};
const downloadSchema = {
  type: "object",
  properties: {
    file: { type: "string", required: true },
  },
};

module.exports = { listSchema, detailSchema, downloadSchema };
