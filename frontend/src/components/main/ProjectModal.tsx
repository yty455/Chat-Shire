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
        <h2>프로젝트 이름 {pjt.name}</h2>
        <p>팀 이름</p>
        <p> 주제 {pjt.content}</p>
        <p>설명</p>
        <p>기간</p>
        <div className={styles.memberbox}>
          {pjt.member.map((mem: any, index: number) => (
            <div key={index}>{mem}</div>
          ))}
        </div>
        <button
          onClick={closeModal}
          style={{ position: "fixed", top: "5%", right: "5%" }}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
