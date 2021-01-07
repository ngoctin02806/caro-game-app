import React, { useState, useCallback } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Error from "../../components/@core/Error";
import Success from "../../components/@core/Success";

import { WrapperLogin, WrapperForm } from "./styled";
import Logo from "../../public/images/logo.svg";

import {
  reSendMailMiddleware,
  validateEmailMiddleware,
} from "../../redux/Auth/auth.middlewares";

const ValidateEmail = (props) => {
  const { error, auth, validateEmail, reSendMail } = props;

  document.title = "Xác thực tài khoản";

  const [code, setCode] = useState("");
  const [isResend, setIsResend] = useState({
    isAllowed: true,
    timer: 20,
  });
  const [hasSent, setHasSent] = useState(false);

  const history = useHistory();

  if (auth.isValidated) {
    history.push({ pathname: "/trang-chu", state: { title: "Trang chủ" } });
  }

  const onResend = useCallback((e) => {
    let countdown = 20;

    reSendMail();

    let timer = setInterval(() => {
      if (countdown === 0) {
        setIsResend({
          ...isResend,
          isAllowed: true,
          timer: 20,
        });

        clearInterval(timer);
      } else {
        setIsResend({
          ...isResend,
          isAllowed: false,
          timer: countdown - 1,
        });
        countdown--;
      }
    }, 1000);
  }, []); // eslint-disable-line

  const onFinish = (values) => {
    validateEmail(values.code);
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
              lang="vi"
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
                  Xác thực tài khoản
                </div>
              </div>
              {error.message && (
                <>
                  <Error fontSize={12} message={error.message} />
                  <div style={{ marginBottom: "9px" }}></div>
                </>
              )}
              {auth.isValidated && (
                <>
                  <Success message="Xác thực thành công !" />
                  <div style={{ marginBottom: "9px" }}></div>
                </>
              )}
              {hasSent && (
                <>
                  <Success
                    message="Đã gửi mail !"
                    onClick={() => setHasSent(false)}
                  />
                  <div style={{ marginBottom: "9px" }}></div>
                </>
              )}
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp mã xác thực!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      // eslint-disable-next-line
                      if (!value || getFieldValue("code").length === 9) {
                        return Promise.resolve();
                      }

                      return Promise.reject("Mã xác thức phải đúng 9 kí tự");
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<BarcodeOutlined className="site-form-item-icon" />}
                  placeholder="Mã xác thực"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100.15px" }}
                  loading={auth.isLoading}
                >
                  {!auth.isLoading && "Xác thực"}
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  className="login-form-button"
                  style={{ width: "100.15px", marginLeft: "10px" }}
                  disabled={!isResend.isAllowed}
                  onClick={(e) => {
                    onResend(e);
                    setHasSent(true);
                  }}
                >
                  {isResend.isAllowed ? "Gửi lại" : isResend.timer}
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
    auth: {
      ...state.auth,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reSendMail: () => dispatch(reSendMailMiddleware()),
    validateEmail: (code) => dispatch(validateEmailMiddleware({ code })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateEmail);
