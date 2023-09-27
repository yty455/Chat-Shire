import React, { useEffect, useState, useRef } from "react";
import styles from "./ProjectModal.module.css";
import { getProject } from "../../utils/projectApi";
import { updateProject } from "../../utils/projectApi";
import { useNavigate } from "react-router-dom";

interface ProjectModalProps {
  pjt: any;
  closeModal: () => void;
  deleteProject: (projectId: any) => Promise<void>;
  updatePJT: (pjtdata: any) => Promise<void>;
}

function ProjectModal({
  pjt,
  closeModal,
  deleteProject,
  updatePJT,
}: ProjectModalProps) {
  const [editState, setEditState] = useState<string | null>(null);

  const [projectData, setProjectData] = useState({
    id: pjt.id,
    name: pjt.name,
    teamName: pjt.teamName,
    description: pjt.description,
    topic: pjt.topic,
    gitRepository: pjt.gitRepository,
    startDate: pjt.startDate,
    endDate: pjt.endDate,
  });
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const getProjectDetail = async () => {
    try {
      const response = await getProject(pjt.id);
      console.log(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutsideClick = (e: any) => {
    // 클릭한 요소가 인풋창 외부인 경우, 해당 인풋창의 상태를 닫음
    if (editState && modalRef.current && !modalRef.current.contains(e.target)) {
      setEditState(null);
    }
  };

  const handleInputClick = (fieldName: string) => {
    setEditState(fieldName);
  };

  useEffect(() => {
    getProjectDetail();
    // 클릭 이벤트 핸들러 등록
    document.addEventListener("click", handleOutsideClick);
    // 컴포넌트 언마운트 시 클릭 이벤트 핸들러 제거
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {editState === "name" ? (
          <input
            type="text"
            value={projectData.name}
            onChange={(e) => {
              setProjectData({ ...projectData, name: e.target.value });
            }}
            onBlur={() => setEditState(null)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT(projectData);
                setEditState(null);
              }
            }}
          />
        ) : (
          <span onClick={() => handleInputClick("name")}>
            프로젝트 이름 {projectData.name}
          </span>
        )}
        {editState === "topic" ? (
          <input
            type="text"
            value={projectData.topic}
            onChange={(e) => {
              setProjectData({ ...projectData, topic: e.target.value });
            }}
            onBlur={() => setEditState(null)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT(projectData);
                setEditState(null);
              }
            }}
          />
        ) : (
          <p onClick={() => handleInputClick("topic")}>
            프로젝트 주제 {projectData.topic}
          </p>
        )}

        {editState === "teamName" ? (
          <input
            type="text"
            value={projectData.teamName}
            onChange={(e) => {
              setProjectData({ ...projectData, teamName: e.target.value });
            }}
            onBlur={() => setEditState(null)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT(projectData);
                setEditState(null);
              }
            }}
          />
        ) : (
          <p onClick={() => handleInputClick("teamName")}>
            팀 이름 {projectData.teamName}
          </p>
        )}

        {editState === "description" ? (
          <input
            type="text"
            value={projectData.description}
            onChange={(e) => {
              setProjectData({ ...projectData, description: e.target.value });
            }}
            onBlur={() => setEditState(null)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT(projectData);
                setEditState(null);
              }
            }}
          />
        ) : (
          <p onClick={() => handleInputClick("description")}>
            설명 {projectData.description}
          </p>
        )}

        {editState === "gitRepository" ? (
          <input
            type="text"
            value={projectData.gitRepository}
            onChange={(e) => {
              setProjectData({ ...projectData, gitRepository: e.target.value });
            }}
            onBlur={() => setEditState(null)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT(projectData);
                setEditState(null);
              }
            }}
          />
        ) : (
          <p onClick={() => handleInputClick("gitRepository")}>
            깃 : {projectData.gitRepository}
          </p>
        )}
        <p>
          기간 <span>{pjt.startDate}</span>~<span>{pjt.endDate}</span>
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
