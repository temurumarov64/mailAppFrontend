import { loginApi } from "../api/messages";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();

  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    loginApi(sender)
      .then((res) => {
        navigate(`/mail/${sender}`);
      })
      .catch((e) => {
        if (e === 401) {
          setMessage("Invalid credentials");
          return;
        }
        setMessage("User is blocked");
      });
  };

  return (
    <div className="login">
      <div className="auth-form-container">
        {/* <h2>Login</h2> */}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="sender">nickname</label>
          <input
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            type="text"
            placeholder="your nickname"
            id="sender"
            name="sender"
          />

          <button type="submit">Log In</button>
        </form>
        <div className="error">{message}</div>
      </div>
    </div>
  );
};
