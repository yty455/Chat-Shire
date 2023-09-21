import React, { useEffect } from "react";
import styles from "./ProjectModal.module.css";
import { getProject } from "../../utils/projectApi";

import { useNavigate } from "react-router-dom";

interface ProjectModalProps {
  pjt: any;
  closeModal: () => void;
  deleteProject: (projectId: any) => Promise<void>;
}

function ProjectModal({ pjt, closeModal, deleteProject }: ProjectModalProps) {
  const navigate = useNavigate();
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
        <button onClick={() => deleteProject(pjt.id)}>삭제</button>
        <button>수정하기</button>
      </div>
    </div>
  );
}

export default ProjectModal;
