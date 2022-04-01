require("dotenv").config();
const fs = require("fs");

const exists = async (filePath) =>
  !!(await fs.promises.stat(filePath).catch((e) => {
    if (process.env.DEBUG_MODE === "true") {
      console.debug(e);
    }
    return false;
  }));

const deleteFile = async (filePath) =>
  await fs.promises.unlink(filePath).catch((e) => {
    if (process.env.DEBUG_MODE === "true") {
      console.debug(e);
    }
    return false;
  });

const listDir = async (dirPath) =>
  await fs.promises.readdir(dirPath).catch((e) => {
    if (process.env.DEBUG_MODE === "true") {
      console.debug(e);
    }
    return [];
  });

module.exports = { exists, deleteFile, listDir };
