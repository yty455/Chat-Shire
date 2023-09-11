import React from "react";
import ProjectCard from "./ProjectCard";
import styles from "./NowProject.module.css";
import Carousel from "../common/Carousel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

interface NowProjectProps {
  nowpjt: Array<object>;
}

const NowProject: React.FC<NowProjectProps> = ({ nowpjt }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/createpjt");
  };

  return (
    <div>
      <h3 className={styles.pjttxt}>진행중인 PJT</h3>

      {/* <Carousel /> */}
      <div className={styles.nowCardBox}>
        {nowpjt.map((pjt: any) => (
          <ProjectCard key={pjt.id} pjt={pjt} />
        ))}
        <Tooltip title="프로젝트 생성" arrow>
          <Fab color="success" aria-label="add" onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default NowProject;
