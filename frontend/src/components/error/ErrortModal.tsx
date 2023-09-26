import React from "react";
import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  closeModal: () => void;
  err: any;
}

function ErrorModal({ closeModal, err }: ErrorModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{err.title}</p>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default ErrorModal;
