import React, { useState } from "react";
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
import SetProjectName from "./SetProjectName";
import SetProjectInfo from "./SetProjectInfo";
import SetGitRepo from "./SetGitRepo";
import SetMember from "./SetMember";
import SetDate from "./SetDate";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { postProject } from "../../utils/projectApi";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: 0,
    label: "이름을 설정 해주세요",
    description: `하하 어떤 프로젝트를 하시나요`,
  },
  {
    id: 1,
    label: "어떤 프로젝트를 시작하나요?",
    description: "주제 입력",
  },
  {
    id: 2,
    label: "팀원을 초대해주세요",
    description: `팀원 초대`,
  },
  {
    id: 3,
    label: "언제까지 진행하시나요?",
    description: `기간 설정`,
  },
  {
    id: 4,
    label: "깃을 설정해주세요",
    description: `깃 설정`,
  },
];

function CreateProject() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  // 프로젝트 이름
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  // 프로젝트 정보
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  // 깃 정보
  const [gitRepository, setGitRepository] = useState("");
  const [branch, setBranch] = useState("");
  const [gitAccessToken, setGitAccessToken] = useState("");
  // 
  const [Members, setMembers] = useState<string[]>([]);

  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs().add(1, "week")
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleProjectNameData = (name: string, teamName: string) => {
    setName(name);
    setTeamName(teamName);
  };

  const handleProjecInfoData = (topic: string, description: string) => {
    setTopic(topic);
    setDescription(description);
  };

  const handleMemberData = (membersData: string[]) => {
    console.log(membersData)
  }

  const handleDateData = (startDate: string, endDate: string) => {
    setStartDate(dayjs(startDate));
    setEndDate(dayjs(endDate));
  };

  const handleGitData = (
    gitRepository: string,
    branch: string,
    gitAccessToken: string
  ) => {
    setGitRepository(gitRepository);
    setBranch(branch);
    setGitAccessToken(gitAccessToken);
  };


  const createProject = async () => {
    const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD") : "";
    const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";
    console.log(
      name,
      teamName,
      topic,
      description,
      gitRepository,
      branch,
      Members,
      formattedStartDate,
      formattedEndDate,
      gitAccessToken
    );

    try {
      const response = await postProject(
        name,
        teamName,
        topic,
        description,
        gitRepository,
        branch,
        Members,
        formattedStartDate,
        formattedEndDate,
        gitAccessToken
      );
      console.log(response);
      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    if (activeStep === steps.length - 1) {
      // 마지막 단계에서만 프로젝트 생성
      createProject();
    } else {
      // 마지막 단계가 아닌 경우에는 다음 단계로 이동
      handleNext();
    }
  };
  const CustomIcon = ({ active, completed, icon }: any) => {
    const contents = completed ? <Check fontSize="inherit" /> : icon;
    return (
      <div
        style={{
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
        }}
      >
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
        <Stepper
          className={styles.stepperContainer}
          activeStep={activeStep}
          orientation="vertical"
          color="greenary"
        >
          {steps.map((step, index) => (
            <Step
              className={activeStep >= index ? styles.show : styles.hide}
              key={step.label}
              color="greenary"
            >
              <StepLabel
                style={{ display: "flex", alignItems: "center" }}
                StepIconComponent={CustomIcon}
                color="greenary"
              >
                {step.label}
              </StepLabel>
              <StepContent
                color="greenary"
                style={{ display: "flex", marginLeft: "14px", border: "none", width: "900px" }}
              >
                {index === 0 && <SetProjectName onData={handleProjectNameData} />}
                {index === 1 && <SetProjectInfo onData={handleProjecInfoData} />}
                {index === 2 && <SetMember onData={handleMemberData}/>}
                {index === 3 && <SetDate onData={handleDateData} />}
                {index === 4 && <SetGitRepo onData={handleGitData} />}
                <div style={{display: "flex",  justifyContent: "flex-end", alignItems: "center"}}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (index === steps.length - 1) {
                        handleClick(); // Finish 버튼을 눌렀을 때만 handleClick 함수 호출
                      } else {
                        handleNext(); // 그 외의 경우에는 다음 단계로 이동
                      }
                    }}
                    sx={{ mt: 1, mr: 1 }}
                    color="greenary"
                  >
                    {index === steps.length - 1 ? "완료" : "다음"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    color="greenary"
                  >
                    이전
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>프로젝트를 생성했습니다. 일하러 가세요 ^^</Typography>

            <Button
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
              color="greenary"
            >
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default CreateProject;
