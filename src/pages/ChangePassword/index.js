import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import axios from "axios";

import Error from "../../components/@core/Error";

import "./style.css";
import {
  WrapperLogin,
  WrapperForm,
  StyledLine,
  BreakLineWrapper,
} from "./styled";
import Logo from "../../public/images/logo.svg";

const openNotification = (placement) => {
  notification.info({
    message: `Thông báo`,
    description: "Đổi mật khẩu thành công !",
    placement,
  });
};

const ChangePassword = (props) => {
  const { error } = props;

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const onFinish = (values) => {
    setIsLoading(true);
    axios("/user/account/password/reset", {
      method: "POST",
      headers: {
        "x-auth-token": queryString.parse(location.search).signature,
      },
      data: {
        new_password: values.password,
      },
    }).then((res) => {
      openNotification("topRight");
      document.title = "Đang chuyển hướng ...";
      setTimeout(() => {
        history.push("/trang-chu");
      }, 2000);
    });
  };

  useEffect(() => {
    document.title = "Thay đổi mật khẩu";
  }, []);

  return (
    <WrapperLogin>
      <Row style={{ height: "100%" }} align="middle" justify="center">
        <Col span={6}>
          <div
            style={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img src={Logo} alt="logo" />
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#40a9ff",
                marginLeft: "5px",
              }}
            >
              Caro game
            </div>
          </div>
          <WrapperForm>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              {error.message && (
                <>
                  <Error fontSize={12} message={error.message} />
                  <div style={{ marginBottom: "9px" }}></div>
                </>
              )}
              <div
                style={{
                  fontWeight: "500",
                  color: "rgb(107, 119, 140)",
                  fontSize: "15px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Nhập mật khẩu mới
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp mật khẩu mới!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password").length > 8) {
                        return Promise.resolve();
                      }

                      return Promise.reject("Chiều dài phải lớn hơn 8 kí tự");
                    },
                  }),
                ]}
              >
                <Input
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Nhập mật khẩu"
                  lang="vi"
                />
              </Form.Item>
              <BreakLineWrapper>
                <StyledLine />
              </BreakLineWrapper>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                  loading={isLoading}
                >
                  {!isLoading && "Thay đổi"}
                </Button>
              </Form.Item>
            </Form>
          </WrapperForm>
        </Col>
      </Row>
    </WrapperLogin>
  );
};

const mapStateToProps = (state) => {
  return {
    error: {
      ...state.error,
    },
  };
};

export default connect(mapStateToProps, null)(ChangePassword);
