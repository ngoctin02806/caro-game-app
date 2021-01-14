import { Alert } from "antd";

const Success = (props) => {
  const { message } = props;
  return (
    <Alert
      style={{ borderRadius: "4px" }}
      message={message}
      type="success"
      showIcon
      closable
    />
  );
};

export default Success;
