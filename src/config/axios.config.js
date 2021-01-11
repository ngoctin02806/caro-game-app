import axios from "axios";

const NODE_ENV = "development";

if (NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000/api/v1";
} else {
  axios.defaults.baseURL = "http://api.hcmusedu.info/api/v1";
}
