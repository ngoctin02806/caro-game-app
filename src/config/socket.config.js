import io from "socket.io-client";

const NODE_ENV = "production";

const socket =
  NODE_ENV === "development"
    ? io("http://localhost:8001")
    : io("https://socket.hcmusedu.info");

export default socket;
