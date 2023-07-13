import { Header } from "components/Header";
import { Footer } from "components/Footer";

import style from "./style.module.scss";

export const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <div className={style.content}>{children}</div>
      <Footer />
    </>
  );
};
