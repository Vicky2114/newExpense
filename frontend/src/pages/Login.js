/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const submitHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Successfully login");
      setUser({ ...data.user, password: "" });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );

      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid username or password");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      Navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-page">
        {loading && <Spinner />}

        <Form layout="vertical" className="login-form" onFinish={submitHandler}>
          <div className="heading mx-2">Expense Tracker App</div>
          <h3 className="heading2 d-flex  justify-content-center align-items-center">
            Sign In
          </h3>
          <Form.Item
            label="Email"
            name="email"
            placeholder="john@gmail.com"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                type: "password",
                message: "Please enter correct password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-center ">
            <button className="custom-button">Sign In</button>
          </div>
          <div></div>

          <div className="d-flex">
            <Link
              to="/register"
              className="link d-flex  mx-3 mt-2 justify-center align-items-center "
            >
              New User ? Click Here To Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
