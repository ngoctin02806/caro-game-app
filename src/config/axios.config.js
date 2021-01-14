import axios from "axios";

const NODE_ENV = "production";

if (NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000/api/v1";
} else {
  axios.defaults.baseURL = "https://api.hcmusedu.info/api/v1";
}
