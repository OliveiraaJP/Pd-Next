import styles from "@/styles/ErrorMessage.module.css";

import React from "react";

interface IProps {
  children: React.ReactNode;
}

function ErrorMessage({ children }: IProps) {
  return (
    <div className={styles.errorMessage}>
      <p>{children}</p>
    </div>
  );
}

export default ErrorMessage;
