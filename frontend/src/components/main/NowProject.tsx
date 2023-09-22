import React from "react";
import ProjectCard from "./ProjectCard";
import styles from "./NowProject.module.css";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface NowProjectProps {
  nowpjt: Array<object>;
  onProjectCardClick: any;
}

const NowProject: React.FC<NowProjectProps> = ({
    nowpjt,
    onProjectCardClick,
  }) => {

  return (
    <div className={styles.NowProjectContainer}>
      <span className={styles.pjttxt}>진행중인 PJT</span>
      <div className={styles.NowProjectSwiper}>
          Swiper
      </div>
    </div>
  );
};

export default NowProject;
