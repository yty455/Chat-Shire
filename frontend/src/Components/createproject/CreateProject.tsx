import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "../common/Container";
import TextField from "@mui/material/TextField";
import styles from "./CreateProject.module.css";
import First from "./First";
import Second from "./Second";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const steps = [
  {
    label: "어떤 프로젝트를 시작하나요",
    description: `하하 어떤 프로젝트를 하시나요`,
  },
  {
    label: "초대 해주세요",
    description: "멤버를 초대하세요",
  },
  {
    label: "프로젝트 생성 완료",
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

  return (
    <Container
      backgroundColor="white"
      text=""
      width="1170px"
      height="85vh"
      margin="60px 10px 40px 10px"
      padding=""
      borderRadius="20px"
      boxShadow=""
      display="flex"
      justifyContent="center"
    >
      <Box
        // sx={{ maxWidth: 600 }}
        width="70%"
        style={{ marginTop: "3%" }}
        color="success"
      >
        <Stepper activeStep={activeStep} orientation="vertical" color="success">
          {steps.map((step, index) => (
            <Step key={step.label} color="success">
              <StepLabel
                color="success"
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent color="success" style={{ width: "60%" }}>
                <Typography color="success">
                  {index === 0 && <First />}
                  {index === 1 && <Second />}
                </Typography>
                <Box sx={{ mb: 2 }} color="success">
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      color="success"
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                      color="success"
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>프로젝트를 생성했습니다. 일하러 가세요 ^^</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} color="success">
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default CreateProject;
