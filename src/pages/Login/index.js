import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Error from "../../components/@core/Error";
import FacebookIcon from "../../components/Icons/FacebookIcon";

import "./style.css";
import {
  WrapperLogin,
  WrapperForm,
  StyledGoogleLogin,
  StyledFacebookLogin,
  StyledLine,
  BreakLineWrapper,
} from "./styled";
import Logo from "../../public/images/logo.svg";

import {
  loginMiddleware,
  loginByFacebookMiddleware,
  loginByGoogleMiddleware,
} from "../../redux/Auth/auth.middlewares";
import config from "../../config/default.config";

const Login = (props) => {
  const { login, loginByGoogle, loginByFacebook, auth, error } = props;

  const [cert, setCert] = useState({ email: "", password: "" });

  const onFinish = (values) => {
    login({ email: values.email, password: values.password });
  };

  const responseGoogle = (response) => {
    loginByGoogle({ accessToken: response.accessToken });
  };

  const responseFacebook = (response) => {
    loginByFacebook({ accessToken: response.accessToken });
  };

  useEffect(() => {
    document.title = "Đăng nhập";
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
              <Form.Item className="caro-game-authen-wrapper">
                <Link className="login-form-forgot" to="/quen-mat-khau">
                  Quên mật khẩu
                </Link>
                <Link className="login-form-forgot" to="/dang-ky">
                  Đăng ký
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                  loading={auth.isLoading}
                >
                  {!auth.isLoading && "Đăng nhập"}
                </Button>
              </Form.Item>
            </Form>
            <BreakLineWrapper>
              <StyledLine />
              <label>Or</label>
              <StyledLine />
            </BreakLineWrapper>
            <StyledGoogleLogin
              className="caro-game-google-btn"
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="Đăng nhập bằng Google"
              onSuccess={responseGoogle}
              onFailure={(response) => {
                console.log(response);
              }}
            />
            <div style={{ margin: "5px 0px" }}></div>
            <StyledFacebookLogin
              icon={<FacebookIcon style={{ marginRight: "20px" }} />}
              cssClass="caro-game-facebook-btn"
              textButton="Đăng nhập bằng Facebook"
              appId={config.FACEBOOK_CLIENT_ID}
              callback={responseFacebook}
            />
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
    login: ({ email, password }) =>
      dispatch(loginMiddleware({ email, password })),
    loginByGoogle: ({ accessToken }) =>
      dispatch(loginByGoogleMiddleware({ accessToken })),
    loginByFacebook: ({ accessToken }) =>
      dispatch(loginByFacebookMiddleware({ accessToken })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
