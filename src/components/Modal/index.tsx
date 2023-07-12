import styles from "./styles.module.scss";

type Props = {
  close: () => void;
  children: any;
  isLight?: boolean;
};

export const Modal = ({ close, children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={close}>
          x
        </span>
        {children}
      </div>
    </div>
  );
};
