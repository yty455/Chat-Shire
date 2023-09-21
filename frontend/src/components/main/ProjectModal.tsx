import React, { useEffect, useState, useRef } from "react";
import styles from "./ProjectModal.module.css";
import { getProject } from "../../utils/projectApi";
import { updateProject } from "../../utils/projectApi";
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
  const [Name, setName] = useState(pjt.name);
  const [TeamName, setTeamName] = useState(pjt.teamName);
  const [Topic, setTopic] = useState(pjt.topic);
  const [Description, setDescription] = useState(pjt.description);
  const [GitRepository, setGitRepository] = useState(pjt.gitRepository);
  const [StartDate, setStartDate] = useState(pjt.startDate);
  const [EndDate, setEndDate] = useState(pjt.endDate);
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

  // 클릭 이벤트 핸들러 추가
  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      // 모달 외부를 클릭하면 모달을 닫습니다.
      setIsEditingName(false);
      setIsEditingTeamName(false);
      setIsEditingDescription(false);
      setIsEditingTopic(false);
      setIsEditingGitRepository(false);
      setIsEditingStartDate(false);
      setIsEditingEndDate(false);
    }
  };

  const updatePJT = async () => {
    try {
      const response = await updateProject(
        pjt.id,
        Name,
        TeamName,
        Topic,
        Description,
        GitRepository,
        StartDate,
        EndDate
      );
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
              setName(e.target.value);
              // 이름을 수정할 때 상태 업데이트
              // e.target.value에 새로운 이름이 들어옵니다.
            }}
            onBlur={() => setIsEditingName(false)} // 포커스를 잃을 때 (인풋창 밖을 클릭하거나 다른 곳으로 이동할 때) 수정 모드 종료
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT();
                setIsEditingName(false); // Enter 키를 누르면 수정 모드 종료
              }
            }}
          />
        ) : (
          <p onClick={() => setIsEditingName(true)}>프로젝트 이름 {pjt.name}</p>
        )}
        {isEditingTopic ? (
          <input
            type="text"
            value={pjt.topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            onBlur={() => setIsEditingTopic(false)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT();
                setIsEditingTopic(false);
              }
            }}
          />
        ) : (
          <p onClick={() => setIsEditingTopic(true)}>주제 {pjt.topic}</p>
        )}

        {isEditingTeamName ? (
          <input
            type="text"
            value={pjt.teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            onBlur={() => setIsEditingTeamName(false)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT();
                setIsEditingTeamName(false);
              }
            }}
          />
        ) : (
          <p onClick={() => setIsEditingTeamName(true)}>
            팀 이름 {pjt.teamName}
          </p>
        )}

        {isEditingDescription ? (
          <input
            type="text"
            value={pjt.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onBlur={() => setIsEditingDescription(false)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT();
                setIsEditingDescription(false);
              }
            }}
          />
        ) : (
          <p onClick={() => setIsEditingDescription(true)}>
            설명 {pjt.description}
          </p>
        )}

        {isEditingGitRepository ? (
          <input
            type="text"
            value={pjt.gitRepository}
            onChange={(e) => {
              setGitRepository(e.target.value);
            }}
            onBlur={() => setIsEditingGitRepository(false)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                updatePJT();
                setIsEditingGitRepository(false);
              }
            }}
          />
        ) : (
          <p onClick={() => setIsEditingGitRepository(true)}>
            깃 : {pjt.gitRepository}
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
