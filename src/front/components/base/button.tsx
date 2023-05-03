import React from "react";
import styles from "@/styles/Button.module.css";

interface ButtonProps {
  onClick: any;
  children: React.ReactNode;
  small?: boolean;
  disabled?: boolean;
}

function Button({ onClick, children, small, disabled = false }: ButtonProps) {
  return !small ? (
    <button onClick={onClick} className={`${styles.button}`} disabled={disabled}>
      {children}
    </button>
  ) : (
    <button onClick={onClick} className={`${styles.button} ${styles.small}`} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
