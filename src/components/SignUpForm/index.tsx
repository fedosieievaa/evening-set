import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SIGNED_IN, USERS } from "const";

import style from "./style.module.scss";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

    const userData = { email: email.trim(), password: password.trim() };
    const prevData = localStorage.getItem(USERS);
    const prevUsers = prevData ? JSON.parse(prevData) : [];

    const isAlreadyExist = prevUsers.find(
      (user: { email: string; password: string }) => user.email === email
    );

    if (isAlreadyExist) {
      setErrorMessage("User already exists.");
      return;
    }

    localStorage.setItem(USERS, JSON.stringify([...prevUsers, userData]));
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
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
