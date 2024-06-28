import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const handleWithLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/login", { email, password });

      if (res.status !== 200) {
        throw new Error(res.error);
      } else {
        setUserData(res.data.user);
        sessionStorage.setItem("token", res.data.token);
        /**Bearer 관습같은.. */
        api.defaults.headers["authorization"] = "Bearer " + res.data.token;
        setError("");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleWithLogin}>
        <h1>로그인</h1>
        {error && <div>{error}</div>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
