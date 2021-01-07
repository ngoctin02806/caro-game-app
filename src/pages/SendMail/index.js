import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
import MailIcon from "../../public/images/check-your-email-open-letter.svg";

const SendMail = (props) => {
  const { error } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSent, setHasSent] = useState(null);

  const onFinish = (values) => {
    setIsLoading(true);
    axios("/user/account/password/forget", {
      method: "POST",
      data: {
        email: values.email,
        host_fe: "http://localhost:3000",
        path_name: "thay-doi-mat-khau",
      },
    }).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        setHasSent(values.email);
      }, 1500);
    });
  };

  useEffect(() => {
    document.title = "Bạn không thể đăng nhập ?";
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
            <div
              style={{
                fontWeight: "500",
                color: "rgb(107, 119, 140)",
                fontSize: "15px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Không thể đăng nhập ?
            </div>
            {!hasSent ? (
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
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgb(107, 119, 140)",
                  }}
                >
                  Chúng tôi sẽ gửi một liên kết thay đổi đến
                </span>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email !",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        // eslint-disable-next-line
                        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!value || regex.test(getFieldValue("email"))) {
                          return Promise.resolve();
                        }

                        return Promise.reject("Không đúng định dạng email");
                      },
                    }),
                  ]}
                >
                  <Input
                    type="text"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Nhập email"
                    lang="vi"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%" }}
                    loading={isLoading}
                  >
                    {!isLoading && "Gửi"}
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div style={{ textAlign: "center", marginBottom: "35px" }}>
                <img
                  src={MailIcon}
                  style={{ width: "105px", marginBottom: "20px" }}
                  alt="letter"
                />
                <p style={{ fontSize: "13.5px" }}>
                  Chúng tôi đã gửi liên kết đến bạn tại
                </p>
                <div
                  style={{
                    fontWeight: "600",
                    color: "rgb(94, 108, 132)",
                    fontSize: "15px",
                  }}
                >
                  {hasSent}
                </div>
              </div>
            )}
            <BreakLineWrapper>
              <StyledLine />
            </BreakLineWrapper>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Link className="login-form-forgot" to="/dang-nhap">
                Đăng nhập
              </Link>
              {hasSent && (
                <Link
                  className="login-form-forgot"
                  onClick={() => setHasSent(null)}
                >
                  Gửi lại liên kết
                </Link>
              )}
            </div>
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

export default connect(mapStateToProps, null)(SendMail);
