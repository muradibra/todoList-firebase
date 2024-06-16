import React, { useState } from "react";
import { login, auth } from "../../firebase";
import { RegisterProps } from "../../types/registerProps";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const registerPrps: RegisterProps = { email, password };
      await login(registerPrps);
      if (auth.currentUser?.email) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="login">
      <div className="login-inner">
        <h1>Login</h1>
        <div className="input email-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input password-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button> <br /> <br />
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
