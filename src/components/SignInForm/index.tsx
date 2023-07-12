import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SIGNED_IN, USERS } from "const";

import style from "./style.module.scss";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem(USERS);
    if (data) {
      setUsers(JSON.parse(data));
    }
  }, []);
  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    errorMessage && setErrorMessage("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    errorMessage && setErrorMessage("");
    setPassword(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const userExists = users.find((user: any) => user?.email === email);
    if (!userExists || userExists?.password !== password) {
      setErrorMessage("Invalid email address or password.");
      return;
    }

    localStorage.setItem(SIGNED_IN, JSON.stringify(email));
    navigate("/");

    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const isValidEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={style.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className={style.error}>{errorMessage}</div>}
        <div className={style.input}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={style.input}>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
