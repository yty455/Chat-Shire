import React, { useState, useEffect } from "react";
import styles from "./ProjectCard.module.css";
import ProfileImgBox from "../common/ProfileImgBox";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getProjectMem } from "../../utils/projectApi";

interface ProjectCardProps {
  pjt?: any;
  onCardClick?: () => void;
  showCreateButton?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  pjt,
  onCardClick,
  showCreateButton,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [pjtMem, setpjtMem] = useState([]);

  const navigate = useNavigate();
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onCardClick?.();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/createpjt");
  };

  const getProjectUsers = async () => {
    try {
      const response = await getProjectMem(pjt.id);
      setpjtMem(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectUsers();
  }, []);

  return (
    <div className={styles.card} onClick={handleModalClick}>
      {pjt ? (
        <>
          <h3>이름:{pjt.name}</h3>
          <p>팀명:{pjt.teamName}</p>
          <p>주제:{pjt.topic}</p>
          <p>
            기간:{pjt.startDate}~{pjt.endDate.substr(5, 9)}
          </p>
          {pjtMem ? (
            <ul>
              {pjtMem.map((user: any) => (
                <li key={user.userId}>
                  <ProfileImgBox
                    backgroundColor={user.profileColor}
                    text=""
                    width="25px"
                    height="25px"
                    margin="10px"
                    padding=""
                    display="flex"
                    backgroundImage={process.env.PUBLIC_URL + user.profileImage}
                  />
                  <span>{user.nickname}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
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
          {showCreateButton && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
