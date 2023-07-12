import { Header } from "components/Header";
import { Footer } from "components/Footer";

export const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
