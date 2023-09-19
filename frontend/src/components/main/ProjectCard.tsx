import React, { useState } from "react";
import styles from "./ProjectCard.module.css";
import ProfileImgBox from "../common/ProfileImgBox";
import img from "../../assets/profile/m57.png";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  return (
    <div className={styles.card} onClick={handleModalClick}>
      {pjt ? (
        <>
          <h3>{pjt.name}</h3>
          <p>{pjt.content}</p>
          <br />
          <br />
          <div className={styles.memberbox}>
            {pjt.member.map((mem: any, index: number) => (
              <div key={index}>
                <ProfileImgBox
                  backgroundColor="red"
                  text=""
                  width="25px"
                  height="25px"
                  margin="10px"
                  padding=""
                  display="flex"
                  backgroundImage={img}
                ></ProfileImgBox>
                {/* {mem} */}
              </div>
            ))}
          </div>
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
    </div>
  );
};

export default ProjectCard;
