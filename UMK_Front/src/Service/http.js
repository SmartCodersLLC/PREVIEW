import axios from "axios";
const baseURL = "http://localhost:3150";
const localURL = "http://localhost:3000";
const appName = "/avnumk";
const apiURL = `/api`;
const version = `/v1/`;

let http = axios.create({
  baseURL: `${baseURL}${appName}${apiURL}${version}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
export { http, localURL, appName };
