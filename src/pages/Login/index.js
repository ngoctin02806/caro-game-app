import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { WrapperLogin, WrapperForm } from "./styled";
import Logo from "../../public/images/logo.svg";

import { login } from "../../redux/Auth/auth.actions";

const Login = (props) => {
  const { login, auth } = props;

  const [cert, setCert] = useState({ email: "", password: "" });

  const onFinish = (values) => {
    login({ email: values.email, password: values.password });
  };

  return (
    <WrapperLogin>
      <Row style={{ height: "100%" }} align="middle" justify="center">
        <Col span={6}>
          <WrapperForm>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div
                style={{
                  display: "flex",
                  margin: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={Logo} alt="logo" />
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#40a9ff",
                    marginLeft: "5px",
                  }}
                >
                  Care game
                </div>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp email!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  value={cert.email}
                  onChange={(e) => {
                    setCert({ ...cert, email: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                validateEmail={true}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp mật khẩu!",
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
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                  value={cert.password}
                  onChange={(e) => {
                    setCert({ ...cert, password: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Link className="login-form-forgot" to="/dang-ky">
                  Quên mật khẩu
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100.15px" }}
                  loading={auth.isLoading}
                >
                  {!auth.isLoading && "Đăng nhập"}
                </Button>
                Or <Link to="/dang-ky">Đăng ký ngay !</Link>
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
    auth: {
      ...state.auth,
      token: state.auth.token,
      expireTime: state.auth.expireTime,
      profileId: state.auth.profileId,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: ({ email, password }) => login(dispatch, { email, password }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
