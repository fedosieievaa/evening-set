import { POSTER_URL } from "const";
import { Layout } from "components/Layout";
import { SignInForm } from "components/SignInForm";

import style from "./style.module.scss";

export const SignIn = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${POSTER_URL}${
            localStorage.getItem(POSTER_URL) ||
            "/wRxLAw4l17LqiFcPLkobriPTZAw.jpg"
          })`,
        }}
        className={style.backdrop}
      />
      <div className={style.container}>
        <SignInForm />
      </div>
    </Layout>
  );
};
