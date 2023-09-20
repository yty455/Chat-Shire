import React, { useEffect } from "react";
import styles from "./ProjectModal.module.css";
import { getProject } from "../../utils/projectApi";

interface ProjectModalProps {
  pjt: any;
  closeModal: () => void;
}

function ProjectModal({ pjt, closeModal }: ProjectModalProps) {
  const getProjectDetail = async () => {
    try {
      const response = await getProject(pjt.id);
      console.log(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectDetail();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>프로젝트 이름 {pjt.name}</h2>
        <p>팀 이름 {pjt.teamName}</p>
        <p>설명 {pjt.description}</p>
        <p>주제 {pjt.topic}</p>
        <p>깃 : {pjt.gitRepository}</p>
        <p>
          기간 {pjt.startDate}~{pjt.endDate}
        </p>
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
