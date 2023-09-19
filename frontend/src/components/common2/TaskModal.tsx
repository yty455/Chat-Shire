import React from "react";
import styles from "./TaskModal.module.css";

interface TaskModalProps {
  closeModal: () => void;
}

function TaskModal({ closeModal }: TaskModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default TaskModal;
