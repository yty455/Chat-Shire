import React from "react";
import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  closeModal: () => void;
}

function ErrorModal({ closeModal }: ErrorModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default ErrorModal;
