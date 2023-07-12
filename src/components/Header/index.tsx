import { Link, useNavigate } from "react-router-dom";

import logo from "./logo.svg";
import style from "./style.module.scss";
import { POSTER_URL, SIGNED_IN } from "const";

export const Header = () => {
  const navigate = useNavigate();
  const isSignInPage = window.location.pathname === "/sign-in";
  const isAlreadyLoggedIn = localStorage.getItem(SIGNED_IN);

  return (
    <header className={style.header}>
      <div className={style.companyLogo}>
        <img src={logo} alt="" className={style.logo} />
        <div className={style.company}>TES</div>
      </div>
      <div className={style.navigation}>
        <Link to="/">GET EVENING SET</Link>
        {isAlreadyLoggedIn && (
          <>
            <span className={style.stick}></span>
            <Link to="/movies-list">MY MOVIES LIST</Link>
            <span className={style.stick}></span>
            <Link to="/drink">MY DRINK</Link>
          </>
        )}
      </div>
      {!isAlreadyLoggedIn ? (
        <button
          className={style.button}
          onClick={() => {
            navigate(isSignInPage ? "/sign-up" : "/sign-in");
          }}
        >
          Sign {isSignInPage ? "Up" : "In"}
        </button>
      ) : (
        <button
          className={style.button}
          onClick={() => {
            localStorage.removeItem(SIGNED_IN);
            localStorage.removeItem(POSTER_URL);
            navigate("/");
          }}
        >
          Log Out
        </button>
      )}
    </header>
  );
};
