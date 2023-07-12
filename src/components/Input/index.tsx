import styles from "./styles.module.scss";

type Props = {
  type?: string;
  status: string;
  value: string;
  error?: string;
  placeholder?: string | any;
  onChange: any;
  isLight: boolean;
};

export const Input = ({
  type = "text",
  status,
  placeholder,
  error,
  onChange,
  value,
  isLight,
}: Props) => {
  return (
    <div className={`${styles.inputWrapper} ${isLight ? styles.light : ""}`}>
      <input
        className={`${styles.input} ${styles[status]}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
