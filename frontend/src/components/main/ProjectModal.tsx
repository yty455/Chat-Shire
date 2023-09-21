import React, { useEffect, useState } from "react";
import styles from "./ProjectModal.module.css";
import { getProject } from "../../utils/projectApi";

import { useNavigate } from "react-router-dom";

interface ProjectModalProps {
  pjt: any;
  closeModal: () => void;
  deleteProject: (projectId: any) => Promise<void>;
}

function ProjectModal({ pjt, closeModal, deleteProject }: ProjectModalProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [isEditingGitRepository, setIsEditingGitRepository] = useState(false);
  const [isEditingStartDate, setIsEditingStartDate] = useState(false);
  const [isEditingEndDate, setIsEditingEndDate] = useState(false);
  const [Name, setName] = useState("");

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
        {isEditingName ? (
          <input
            type="text"
            value={pjt.name}
            onChange={(e) => {
              // 이름을 수정할 때 상태 업데이트
              // e.target.value에 새로운 이름이 들어옵니다.
            }}
            onBlur={() => setIsEditingName(false)} // 포커스를 잃을 때 (인풋창 밖을 클릭하거나 다른 곳으로 이동할 때) 수정 모드 종료
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setIsEditingName(false); // Enter 키를 누르면 수정 모드 종료
              }
            }}
          />
        ) : (
          <>
            프로젝트 이름 {pjt.name}
            <button onClick={() => setIsEditingName(true)}>수정</button>
          </>
        )}
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
      </div>
    </div>
  );
}

export default ProjectModal;
