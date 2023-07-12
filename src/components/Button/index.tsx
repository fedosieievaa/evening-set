import styles from "./styles.module.scss";
import { Loader } from "../Loader";

type Props = {
  status: string;
  text?: string | JSX.Element;
  onClick: any;
};

export const Button = ({ status, onClick, text }: Props) => {
  return (
    <div className={`${styles.buttonWrapper}`}>
      <button
        className={`${styles.button} ${styles[status]}`}
        onClick={onClick}
      >
        {status === "loading" ? <Loader /> : text}
      </button>
    </div>
  );
};
