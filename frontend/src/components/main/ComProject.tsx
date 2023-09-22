import React from "react";
import ProjectCard from "./ProjectCard";
import styles from "./ComProject.module.css";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Slick from "../common/Slick";

interface ComProjectProps {
  compjt: Array<object>;
  onProjectCardClick: any;
}

const ComProject: React.FC<ComProjectProps> = ({
    compjt,
    onProjectCardClick,
  }) => {

  return (
    <div className={styles.ComProjectContainer}>
      <span className={styles.pjttxt}>완료한 PJT</span>
      <div className={styles.ComProjectSwiper}>
        Swiper
      </div>
    </div>
  );
};

export default ComProject;
