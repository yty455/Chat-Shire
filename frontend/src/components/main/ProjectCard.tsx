import React, { useState } from "react";
import styles from "./ProjectCard.module.css";
import ProfileImgBox from "../common/ProfileImgBox";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { outProject } from "../../utils/projectApi";

interface ProjectCardProps {
  pjt?: any;
  onCardClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ pjt, onCardClick }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onCardClick?.();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/createpjt");
  };

  const deleteProject = async () => {
    try {
      const response = await outProject(pjt.id);
      console.log(response);

      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.card} onClick={handleModalClick}>
      {pjt ? (
        <>
          <h3>이름:{pjt.name}</h3>
          <p>팀명:{pjt.teamName}</p>
          <p>주제:{pjt.topic}</p>
          <br />
          <br />
          <p>
            기간:{pjt.startDate}~{pjt.endDate}
          </p>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Tooltip title="프로젝트 생성" arrow>
              <Link to="/createpjt">
                <Fab
                  aria-label="add"
                  onClick={handleClick}
                  style={{ backgroundColor: "#39a789", color: "white" }}
                >
                  <AddIcon />
                </Fab>
              </Link>
            </Tooltip>
            <p>프로젝트 생성</p>
          </div>
        </div>
      )}
      <button onClick={deleteProject}>삭제</button>
      <button>수정하기</button>
    </div>
  );
};

export default ProjectCard;
