import React from "react";
import ProjectCard from "./ProjectCard";
import styles from "./ComProject.module.css";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface ComProjectProps {
  compjt: Array<object>;
  onProjectCardClick: any;
}

const ComProject: React.FC<ComProjectProps> = ({
  compjt,
  onProjectCardClick,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = compjt.length / 3;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div>
      <h3 className={styles.pjttxt}>완료한 PJT</h3>
      <Box sx={{ flexGrow: 1 }}>
        <div className={styles.comCardBox}>
          {compjt.length === 0 ? (
            // 프로젝트가 없을 때 빈 카드 표시
            <ProjectCard />
          ) : (
            <>
              <ProjectCard
                pjt={compjt[activeStep * 3]}
                onCardClick={() => onProjectCardClick(compjt[activeStep * 3])}
              />
              <ProjectCard
                pjt={compjt[activeStep * 3 + 1]}
                onCardClick={() =>
                  onProjectCardClick(compjt[activeStep * 3 + 1])
                }
              />
              <ProjectCard
                pjt={compjt[activeStep * 3 + 2]}
                onCardClick={() =>
                  onProjectCardClick(compjt[activeStep * 3 + 2])
                }
              />
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
    </div>
  );
};

export default ComProject;
