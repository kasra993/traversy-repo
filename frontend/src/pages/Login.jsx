import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          {" "}
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onChange}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-block"></button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;