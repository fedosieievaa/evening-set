import { POSTER_URL } from "const";
import { SignUpForm } from "components/SignUpForm";
import { Layout } from "components/Layout";

import style from "./style.module.scss";

export const SignUp = () => {
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
        <SignUpForm />
      </div>
    </Layout>
  );
};
