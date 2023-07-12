import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import style from "./style.module.scss";

export const Notification = ({ message, setNotification }: any) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(false);
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return ReactDOM.createPortal(
    isVisible ? <div className={style.notification}>{message}</div> : null,
    // @ts-ignore
    document.getElementById("notification-root")
  );
};
