import React, { useEffect, useState, useRef } from "react";
import styles from "./ProjectModal.module.css";
import { getProject } from "../../utils/projectApi";
import { updateProject } from "../../utils/projectApi";
import { useNavigate } from "react-router-dom";
import { getProjectMem } from "../../utils/projectApi";
import ProfileImgBox from "../common/ProfileImgBox";
import { Button } from "antd";
import { Avatar } from "@mui/material";

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
  const [pjtMem, setpjtMem] = useState([]);
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
  const getProjectUsers = async () => {
    try {
      const response = await getProjectMem(pjt.id);
      console.log(response.data.result[0]);
      setpjtMem(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectUsers();
  }, []);

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
        <div>
          <div>
            {editState === "name" ? (
              <div style={{ marginBottom: "6px" }}>
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
              </div>
            ) : (
              <div style={{ marginBottom: "6px" }}>
                <span
                  style={{ fontFamily: "preBd", fontSize: "24px" }}
                  onClick={() => handleInputClick("name")}
                >
                  {projectData.name}
                </span>
              </div>
            )}
          </div>
          <div>
            {editState === "teamName" ? (
              <div className={styles.projectModalContent}>
                <input
                  type="text"
                  value={projectData.teamName}
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      teamName: e.target.value,
                    });
                  }}
                  onBlur={() => setEditState(null)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      updatePJT(projectData);
                      setEditState(null);
                    }
                  }}
                />
              </div>
            ) : (
              <div className={styles.projectModalContent}>
                <span
                  style={{ fontFamily: "preBd", fontSize: "24px" }}
                  onClick={() => handleInputClick("teamName")}
                >
                  {projectData.teamName}
                </span>
              </div>
            )}
          </div>
          <div>
            {editState === "topic" ? (
              <div className={styles.projectModalContent}>
                <span className={styles.projectModalContentTitle}>
                  프로젝트 주제
                </span>
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
              </div>
            ) : (
              <div className={styles.projectModalContent}>
                <span className={styles.projectModalContentTitle}>
                  프로젝트 주제
                </span>
                <span onClick={() => handleInputClick("topic")}>
                  {projectData.topic}
                </span>
              </div>
            )}
          </div>
          <div>
            {editState === "description" ? (
              <div className={styles.projectModalContent}>
                <span className={styles.projectModalContentTitle}>설명</span>
                <input
                  type="text"
                  value={projectData.description}
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    });
                  }}
                  onBlur={() => setEditState(null)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      updatePJT(projectData);
                      setEditState(null);
                    }
                  }}
                />
              </div>
            ) : (
              <div className={styles.projectModalContent}>
                <span className={styles.projectModalContentTitle}>설명</span>
                <span onClick={() => handleInputClick("description")}>
                  {projectData.description}
                </span>
              </div>
            )}
          </div>
          <div>
            {editState === "gitRepository" ? (
              <div className={styles.projectModalContent}>
                <span className={styles.projectModalContentTitle}>Github</span>
                <input
                  type="text"
                  value={projectData.gitRepository}
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      gitRepository: e.target.value,
                    });
                  }}
                  onBlur={() => setEditState(null)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      updatePJT(projectData);
                      setEditState(null);
                    }
                  }}
                />
              </div>
            ) : (
              <div className={styles.projectModalContent}>
                <span className={styles.projectModalContentTitle}>Github</span>
                <span onClick={() => handleInputClick("gitRepository")}>
                  {projectData.gitRepository}
                </span>
              </div>
            )}
          </div>
          <div className={styles.projectModalContent}>
            <span className={styles.projectModalContentTitle}>
              프로젝트 기간
            </span>
            <span>
              {pjt.startDate}~{pjt.endDate}
            </span>
          </div>
          <div className={styles.ProjectMemberContainer}>
            {pjtMem.map((user: any) => (
              <Avatar
                alt="Remy Sharp"
                src={
                  user.profileImage != null
                    ? process.env.PUBLIC_URL + user.profileImage
                    : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                }
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: user.profileColor,
                  marginRight: "10px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        style={{ cursor: "pointer" }}
        onClick={closeModal}
        className={styles.closebtn}
      >
        X
      </button>
      <Button
        className={styles.deletebtn}
        style={{ backgroundColor: "red", fontFamily: "preRg" }}
        key="submit"
        type="primary"
        onClick={() => deleteProject(pjt.id)}
      >
        프로젝트 나가기
      </Button>
    </div>
  );
}

export default ProjectModal;
