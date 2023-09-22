import React, { useState, useEffect } from "react";
import styles from "./TeamTask.module.css";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CreateIcon from "@mui/icons-material/Create";
import Checkbox from "@mui/material/Checkbox";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { getTaskGroup } from "../../utils/taskGroupApi";
import { postTaskGroup } from "../../utils/taskGroupApi";

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ["red", "blue", "green"];

type CheckboxItem = {
  id: number;
  isChecked: boolean;
  content: string;
  isEditing: boolean;
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 0,
  margin: "0 0 5px 0",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "#39A789" : "#308fe8",
  },
}));

const AllBorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 8,
  margin: "20px 0",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      // position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface TeamTaskProps {
  projectId: string;
}

export default function TeamTask({ projectId }: TeamTaskProps) {
  const [allTeamTask, setAllTeamTask] = useState([]);
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([
    {
      id: 1,
      isChecked: false,
      content: "밥 맛깔나게 먹기! 밥 맛깔나게 먹기!",
      isEditing: false,
    },
    {
      id: 2,
      isChecked: false,
      content: "밥 맛깔나게 먹기! 밥 맛깔나게 먹기!",
      isEditing: false,
    },
    // ...
  ]);

  const handleCheckboxChange = (id: number) => () => {
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  const [taskData, setTaskData] = useState({
    name: "이름",
    description: "설명",
    priority: "HIGH",
    progress: "ONGOING",
    deadline: "2023-09-21",
  });

  const addCheckbox = () => {
    const newId = checkboxItems.length + 1;
    setCheckboxItems([
      ...checkboxItems,
      { id: newId, isChecked: false, content: "", isEditing: true },
    ]);
  };

  const handleContentChange = (id: number) => (event: any) => {
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, content: event.target.value, isEditing: false }
          : item
      )
    );
  };

  const getTeamTask = async () => {
    try {
      const response = await getTaskGroup(projectId);
      console.log(response.data.result);
      setAllTeamTask(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  const createProjectGroup = async () => {
    try {
      const response = await postTaskGroup(
        projectId,
        taskData.name,
        taskData.description,
        taskData.priority,
        taskData.progress,
        taskData.deadline
      );
      console.log(response.data.result);
      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeamTask();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.messageLeftTitle}>2차 특화 PJT</p>
        <AllBorderLinearProgress
          style={{ marginTop: "29px", width: "500px" }}
          variant="determinate"
          value={50}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ padding: "0 0 20px 20px", width: "50%" }}>
          {/* <p className={styles.taskProgress}>Task 진행도</p> */}
          {/* <div className={styles.progressBar}> */}

          {/* </div> */}
          <p className={styles.taskProgress}>완료된 Task</p>

          <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon />
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <div onClick={addCheckbox}>
                <CreateIcon />
              </div>
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{ margin: "14px 0 15px 20px" }}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            {checkboxItems.map((item) => (
              <Grid sx={{ margin: 0, padding: 0 }} item key={item.id}>
                <div className={styles.indivTask}>
                  <Checkbox
                    sx={{
                      color: "#39A789",
                      "&.Mui-checked": { color: "#39A789" },
                    }}
                    style={{ height: "20px", margin: "4px 0" }}
                    checked={item.isChecked}
                    onChange={handleCheckboxChange(item.id)}
                  />
                  {item.isEditing ? (
                    <input
                      type="text"
                      onBlur={handleContentChange(item.id)}
                      placeholder="내용을 입력하세요"
                    />
                  ) : (
                    <p
                      className={`${styles.taskContent} ${
                        item.isChecked ? styles.checked : ""
                      }`}
                    >
                      {item.content}
                    </p>
                  )}
                </div>
                {/* <Button sx={{marginLeft: '5px', marginBottom:'20px',fontFamily:'preRg'}} color="error" size="small" onClick={() => removeCheckbox(item.id)} variant="contained">삭제</Button> */}
              </Grid>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 20px 0 20px", width: "50%" }}>
          <p className={styles.taskProgress}>진행중인 Task</p>
          <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon />
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <div onClick={addCheckbox}>
                <CreateIcon />
              </div>
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{ margin: "14px 0 15px 20px" }}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            {checkboxItems.map((item) => (
              <Grid sx={{ margin: 0, padding: 0 }} item key={item.id}>
                <div className={styles.indivTask}>
                  <Checkbox
                    sx={{
                      color: "#39A789",
                      "&.Mui-checked": { color: "#39A789" },
                    }}
                    style={{ height: "20px", margin: "4px 0" }}
                    checked={item.isChecked}
                    onChange={handleCheckboxChange(item.id)}
                  />
                  {item.isEditing ? (
                    <input
                      type="text"
                      onBlur={handleContentChange(item.id)}
                      placeholder="내용을 입력하세요"
                    />
                  ) : (
                    <p
                      className={`${styles.taskContent} ${
                        item.isChecked ? styles.checked : ""
                      }`}
                    >
                      {item.content}
                    </p>
                  )}
                </div>
                {/* <Button sx={{marginLeft: '5px', marginBottom:'20px',fontFamily:'preRg'}} color="error" size="small" onClick={() => removeCheckbox(item.id)} variant="contained">삭제</Button> */}
              </Grid>
            ))}
          </div>

          <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon />
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <CreateIcon />
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{ margin: "14px 0 15px 20px" }}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            {checkboxItems.map((item) => (
              <Grid sx={{ margin: 0, padding: 0 }} item key={item.id}>
                <div className={styles.indivTask}>
                  <Checkbox
                    sx={{
                      color: "#39A789",
                      "&.Mui-checked": { color: "#39A789" },
                    }}
                    style={{ height: "20px", margin: "4px 0" }}
                    checked={item.isChecked}
                    onChange={handleCheckboxChange(item.id)}
                  />
                  {item.isEditing ? (
                    <input
                      type="text"
                      onBlur={handleContentChange(item.id)}
                      placeholder="내용을 입력하세요"
                    />
                  ) : (
                    <p
                      className={`${styles.taskContent} ${
                        item.isChecked ? styles.checked : ""
                      }`}
                    >
                      {item.content}
                    </p>
                  )}
                </div>
                {/* <Button sx={{marginLeft: '5px', marginBottom:'20px',fontFamily:'preRg'}} color="error" size="small" onClick={() => removeCheckbox(item.id)} variant="contained">삭제</Button> */}
              </Grid>
            ))}
          </div>

          <Fab
            sx={{
              mt: "20px",
              mr: "auto",
              ml: "auto",
              display: "flex",
              justifyContent: "center",
            }}
            color="greenary"
            aria-label="add"
            // onClick={addCheckbox}
            onClick={createProjectGroup}
          >
            <AddIcon />
          </Fab>
          <input
            type="text"
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          />
          <input
            type="text"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
          <input
            type="text"
            value={taskData.priority}
            onChange={(e) =>
              setTaskData({ ...taskData, priority: e.target.value })
            }
          />
          <input
            type="text"
            value={taskData.deadline}
            onChange={(e) =>
              setTaskData({ ...taskData, deadline: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
