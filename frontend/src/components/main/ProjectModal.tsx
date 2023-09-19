import React from "react";
import styles from "./ProjectModal.module.css";

interface ProjectModalProps {
  pjt: any;
  closeModal: () => void;
}

function ProjectModal({ pjt, closeModal }: ProjectModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{pjt.name}</h2>
        <p>{pjt.content}</p>
        <div className={styles.memberbox}>
          {pjt.member.map((mem: any, index: number) => (
            <div key={index}></div>
          ))}
        </div>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default ProjectModal;
