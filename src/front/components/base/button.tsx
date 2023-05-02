import React from "react";
import styles from "@/styles/Button.module.css";

interface ButtonProps {
  onClick: any;
  children: React.ReactNode;
  small?: boolean;
}

function Button({ onClick, children, small }: ButtonProps) {
  return !small ? (
    <button onClick={onClick} className={`${styles.button}`}>
      {children}
    </button>
  ) : (
    <button onClick={onClick} className={`${styles.button} ${styles.small}`}>
      {children}
    </button>
  );
}

export default Button;
