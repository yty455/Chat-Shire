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
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { getProject } from "../../utils/projectApi";
import TeamTaskCreateModal from "./TeamTaskCreateModal";
import TaskModal from "./TaskModal";
import {
  deleteTaskGroup,
  updateTaskGroup,
  postTaskGroup,
  getTaskGroup,
} from "../../utils/taskGroupApi";

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

const StyledBadgeRed = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "red",
    color: "red",
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
  const currentDate = new Date();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [allTeamTask, setAllTeamTask] = useState([]);
  const [pjt, setPjt] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState("");
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

  const deleteTeamTask = async (taskGroupId: any) => {
    try {
      const response = await deleteTaskGroup(taskGroupId);
      console.log(response);
      getTeamTask();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (data: string | number) => {
    console.log(data);
    setIsModalOpen(data.toString());
    if (data != "create") {
      const taskId = typeof data === "string" ? parseInt(data) : data;
      setSelectedTaskId(taskId);
    }
  };
  const closeModal = () => {
    setIsModalOpen("");
    setSelectedTaskId(null);
  };

  const handleCheckboxChange = (id: number) => () => {
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    priority: "MEDIUM",
    progress: "ONGOING",
    deadline: dayjs().format("YYYY-MM-DD"),
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
      console.log(response.data.result[0]);
      setAllTeamTask(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getpjt = async () => {
    try {
      const response = await getProject(projectId);
      console.log(response.data.result[0]);
      setPjt(response.data.result[0]);
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
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTeamTask = async (taskGroupId: any, data: any) => {
    try {
      const response = await updateTaskGroup(
        taskGroupId,
        data.name,
        data.description,
        data.priority,
        data.progress,
        data.deadline
      );

      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };

  // 뱃지 클릭 시 progress를 변경하는 함수
  const handleBadgeClick = (task: any) => {
    const updatedProgress = task.progress === "ONGOING" ? "DONE" : "ONGOING";
    const data = {
      name: task.name,
      description: task.description,
      priority: task.priority,
      progress: updatedProgress,
      deadline: task.deadline,
    };
    updateTeamTask(task.id, data);
  };

  useEffect(() => {
    getTeamTask();
    getpjt();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pjt && <p className={styles.messageLeftTitle}>{pjt.name}</p>}
        <AllBorderLinearProgress
          style={{ marginTop: "29px", width: "500px" }}
          variant="determinate"
          value={50}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ padding: "0 0 20px 20px", width: "50%" }}>
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

          {allTeamTask &&
            allTeamTask.map((task: any) => (
              <div className={styles.taskContainer} key={task.id}>
                {/* 이 부분에서 task 객체의 속성을 사용하여 표시할 내용을 구성 */}
                <div className={styles.taskHeader}>
                  <div className={styles.clockNday}>
                    <WatchLaterIcon />
                    <p className={styles.dday}>
                      {Math.floor(
                        (new Date(task.deadline).getTime() -
                          currentDate.getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}{" "}
                      day
                    </p>
                  </div>
                  <div onClick={addCheckbox}>
                    <CreateIcon />
                  </div>
                </div>
                <div className={styles.stepStatus}>
                  {task.progress === "ONGOING" ? (
                    <StyledBadge
                      sx={{ margin: "14px 0 15px 20px" }}
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      variant="dot"
                      onClick={() => handleBadgeClick(task)}
                    ></StyledBadge>
                  ) : (
                    <StyledBadgeRed
                      sx={{ margin: "14px 0 15px 20px" }}
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      variant="dot"
                      onClick={() => handleBadgeClick(task)}
                    ></StyledBadgeRed>
                  )}
                  <p className={styles.step} onClick={() => openModal(task.id)}>
                    {task.name}
                  </p>
                  <p
                    className={styles.step}
                    style={{
                      color:
                        task.priority === "HIGH"
                          ? "red"
                          : task.priority === "LOW"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {task.priority}
                  </p>
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
                  </Grid>
                ))}
              </div>
            ))}

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
            // onClick={createProjectGroup}
            onClick={() => openModal("create")}
          >
            <AddIcon />
          </Fab>

          {isModalOpen === "create" && (
            <TeamTaskCreateModal
              taskData={taskData}
              closeModal={closeModal}
              createTeampjt={createProjectGroup}
              setTaskData={setTaskData}
            />
          )}
          {selectedTaskId !== null && (
            <TaskModal
              closeModal={closeModal}
              taskId={selectedTaskId}
              deleteTeamTask={deleteTeamTask}
              updateTeamTask={updateTeamTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}
