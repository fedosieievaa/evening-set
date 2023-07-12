import { SignUpForm } from "components/SignUpForm";

import style from "./style.module.scss";
import { Layout } from "components/Layout";
import { POSTER_URL } from "const";

export const SignUp = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${POSTER_URL}${
            localStorage.getItem(POSTER_URL) ||
            "/vYbSNn5u1YzoBE0akLRCTZN5k7m.jpg"
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
