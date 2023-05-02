import React from "react";
import styles from "@/styles/Modal.module.css";

type ModalProps = {
  onClose: (e: any) => void;
  children: React.ReactNode;
  modalName: string;
};

const Modal = ({ onClose, children, modalName }: ModalProps) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <span className={styles.modalHeader}>
          <h2>{modalName}</h2>
          <p onClick={onClose}>X</p>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
