const listSchema = {
  type: "object",
  properties: {
    year: { type: "number", required: true },
    kafedra: { type: "number", required: true },
  },
};

module.exports = { listSchema };
