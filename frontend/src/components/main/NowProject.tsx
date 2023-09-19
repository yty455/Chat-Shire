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
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = Math.ceil((nowpjt.length + 1) / 3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <h3 className={styles.pjttxt}>진행중인 PJT</h3>
      <Box sx={{ flexGrow: 1 }}>
        <div className={styles.nowCardBox}>
          {activeStep + 1 === maxSteps ? (
            <>
              {nowpjt.length > activeStep && (
                <ProjectCard
                  pjt={nowpjt[activeStep]}
                  onCardClick={() => onProjectCardClick(nowpjt[activeStep])}
                />
              )}
              {nowpjt.length > activeStep + 1 && (
                <ProjectCard
                  pjt={nowpjt[activeStep + 1]}
                  onCardClick={() => onProjectCardClick(nowpjt[activeStep + 1])}
                />
              )}
              <ProjectCard />
            </>
          ) : (
            <>
              {nowpjt.length > activeStep && (
                <ProjectCard
                  pjt={nowpjt[activeStep]}
                  onCardClick={() => onProjectCardClick(nowpjt[activeStep])}
                />
              )}
              {nowpjt.length > activeStep + 1 && (
                <ProjectCard
                  pjt={nowpjt[activeStep + 1]}
                  onCardClick={() => onProjectCardClick(nowpjt[activeStep + 1])}
                />
              )}
              {nowpjt.length > activeStep + 2 && (
                <ProjectCard
                  pjt={nowpjt[activeStep + 2]}
                  onCardClick={() => onProjectCardClick(nowpjt[activeStep + 2])}
                />
              )}
            </>
          )}
        </div>
        <MobileStepper
          style={{ height: "20px", padding: "10px" }}
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
      {/* <Carousel /> */}
      {/* <div className={styles.nowCardBox}>
        {nowpjt.map((pjt: any) => (
          <ProjectCard key={pjt.id} pjt={pjt} />
        ))}
        <Tooltip title="프로젝트 생성" arrow>
          <Fab
            aria-label="add"
            onClick={handleClick}
            className={styles.hoverEffect}
            style={{ backgroundColor: "#39a789", color: "white" }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div> */}
    </div>
  );
};

export default NowProject;
