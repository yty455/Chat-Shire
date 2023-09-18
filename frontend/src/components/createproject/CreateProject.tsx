import * as React from "react";
import Box from "@mui/material/Box";
import { Step, StepLabel, Stepper } from "@mui/material";
import { Check } from "@mui/icons-material";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "../common/Container";
import TextField from "@mui/material/TextField";
import styles from "./CreateProject.module.css";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const steps = [
  {
    id: 0,
    label: "이름을 설정 해주세요",
    description: `하하 어떤 프로젝트를 하시나요`,
  },
  {
    id: 1,
    label: "어떤 프로젝트를 시작하나요?",
    description: "멤버를 초대하세요",
  },
  {
    id: 2,
    label: "팀원을 초대해주세요",
    description: `플젝 생성 완료입니당`,
  },
  {
    id: 3,
    label: "언제까지 진행하시나요?",
    description: `플젝 생성 완료입니당`,
  },
  {
    id: 4,
    label: "마지막 단계입니다",
    description: `플젝 생성 완료입니당`,
  },
];

function CreateProject() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const CustomIcon = ({ active, completed, icon, }: any) => {
    const contents = completed ? <Check fontSize="inherit" /> : icon;
    return (
      <div style={{
          backgroundColor: active || completed ? "#39A789" : "#45CEA8",
          color: "white",
          minHeight: "20px",
          minWidth: "20px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          fontSize: "14px",
        }}>
        {contents}
      </div>
    );
  };

  return (
    <Container
      display="flex"
      flexDirection="column"
      backgroundColor="white"
      text=""
      width="54vw"
      height="81vh"
      margin=""
      padding="2vh 2vw"
      borderRadius="20px"
      border="1px solid #E5E8EB"
      justifyContent="flex-start"
      boxShadow=""
      backdropFilter=""
      transition=""
    >
      <span className={styles.CreateProjectTitle}>프로젝트 생성</span>
      <Box
        // sx={{ maxWidth: 600 }}
        width="80%"
        style={{ marginTop: "1%" }}
        color="success"
      >
        <Stepper className={styles.stepperContainer} activeStep={activeStep} orientation="vertical" color="greenary">
          {steps.map((step, index) => (
            <Step className={ activeStep >= index ? styles.show : styles.hide } key={step.label} color="greenary">
              <StepLabel
                style={{ display: "flex", alignItems: "center" }}
                StepIconComponent={CustomIcon}
                color="greenary"
              >
                {step.label}
              </StepLabel>
              <StepContent color="greenary" style={{ display: "flex", marginLeft: "14px", border: "none" }}>
                {index === 0 && <First />}
                {index === 1 && <Second />}
                {index === 2 && <Third />}
                {index === 3 && <Fourth />}
                <div style={{}}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    color="greenary"
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color="greenary"
                  >
                    Back
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>프로젝트를 생성했습니다. 일하러 가세요 ^^</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} color="greenary">
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default CreateProject;
