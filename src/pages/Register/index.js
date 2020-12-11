import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Error from "../../components/@core/Error";

import { WrapperLogin, WrapperForm } from "./styled";
import Logo from "../../public/images/logo.svg";

import { registerMiddleware } from "../../redux/Auth/auth.middlewares";

const Register = (props) => {
  const { register, auth, error } = props;

  const [cert, setCert] = useState({ email: "", password: "", username: "" });

  const onFinish = (values) => {
    register({
      email: values.email,
      password: values.password,
      username: values.username,
    });
  };

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

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
                  Caro game
                </div>
              </div>
              {error.message && (
                <>
                  <Error fontSize={12} message={error.message} />
                  <div style={{ marginBottom: "9px" }}></div>
                </>
              )}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp họ và tên!",
                  },
                ]}
              >
                <Input
                  prefix={<IdcardOutlined className="site-form-item-icon" />}
                  placeholder="Họ và tên"
                  value={cert.username}
                  onChange={(e) => {
                    setCert({ ...cert, username: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp email!",
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
              <Form.Item
                name="confirmpassword"
                validateEmail={true}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        !value ||
                        getFieldValue("password").length ===
                          getFieldValue("confirmpassword").length
                      ) {
                        return Promise.resolve();
                      }

                      return Promise.reject("Mật khẩu không khớp");
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
                  {!auth.isLoading && "Đăng ký"}
                </Button>
                Or <Link to="/dang-ky">Đăng nhập ngay !</Link>
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
    register: ({ email, password, username }) =>
      dispatch(registerMiddleware({ username, email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
