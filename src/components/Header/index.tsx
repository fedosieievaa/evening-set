import { Link, useNavigate } from "react-router-dom";

import { POSTER_URL, SIGNED_IN } from "const";
import logo from "./logo.svg";

import style from "./style.module.scss";

const PAGES = {
  main: "/",
  list: "/movies-list",
  drink: "/drink",
};

export const Header = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isSignInPage = pathname === "/sign-in";
  const isAlreadyLoggedIn = localStorage.getItem(SIGNED_IN);
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  return (
    <header className={style.header}>
      <div className={style.companyLogo}>
        <img src={logo} alt="" className={style.logo} />
        <div className={style.company}>TES</div>
      </div>
      <div className={style.navigation}>
        <Link
          to={PAGES.main}
          className={pathname === PAGES.main ? style.active : ""}
        >
          {!isMobileDevice ? "GET EVENING SET" : "GET SET"}
        </Link>
        {isAlreadyLoggedIn && (
          <>
            <span className={style.stick}></span>
            <Link
              to={PAGES.list}
              className={pathname === PAGES.list ? style.active : ""}
            >
              {!isMobileDevice ? "MY MOVIES LIST" : "MOVIES"}
            </Link>
            <span className={style.stick}></span>
            <Link
              to={PAGES.drink}
              className={pathname === PAGES.drink ? style.active : ""}
            >
              {!isMobileDevice ? "MY DRINK" : "DRINK"}
            </Link>
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
