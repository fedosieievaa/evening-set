import style from "./style.module.scss";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.information}>
        <div>Privacy policy</div>
        <div>Term of service</div>
        <div>Language</div>
      </div>
      <div>© 2023</div>
    </footer>
  );
};
