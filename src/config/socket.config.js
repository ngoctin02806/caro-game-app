import io from "socket.io-client";

const NODE_ENV = "development";

const socket =
  NODE_ENV === "development"
    ? io("http://192.168.1.20:8001")
    : io("http://103.137.184.140:8012");

export default socket;
