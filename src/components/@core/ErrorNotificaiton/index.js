import { notification } from "antd";

const ErrorNotification = (placement) => {
  notification.error({
    message: `Notification ${placement}`,
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    placement,
  });
};

export default ErrorNotification;
