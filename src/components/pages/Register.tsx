import React, { useState } from "react";
import { register, auth } from "../../firebase";
import { RegisterProps } from "../../types/registerProps";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const registerPrps: RegisterProps = { email, password };
      await register(registerPrps);
      if (auth.currentUser?.email) {
        navigate('/');
      } 
      console.log(auth);
    } catch (err) {
      console.error("auth", err);
    }
  };

  return (
    <div className="register">
      <div className="register-inner">
        <h1>Register</h1>
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
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
