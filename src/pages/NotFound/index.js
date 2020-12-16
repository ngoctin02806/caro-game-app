import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Không tìm thấy";
  }, []);

  return (
    <Result
      style={{ paddingTop: "150px" }}
      status="404"
      title="404"
      subTitle="Sorry, Trang bạn đã truy cập không tồn tại."
      extra={
        <Link to="/trang-chu">
          <Button type="primary">Quay lại trang chủ</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
