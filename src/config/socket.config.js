import io from "socket.io-client";

const NODE_ENV = "production";

const socket =
  NODE_ENV === "development"
    ? io("http://localhost:8001")
    : io("http://103.137.184.140:8012");

export default socket;
