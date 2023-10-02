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
import { BsPencilFill, BsCheckAll, BsFillChatDotsFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Paper from "@mui/material/Paper";
import { BiSolidCheckCircle } from "react-icons/bi";
import { getTask, deleteTask, postTask, updateTask } from "../../utils/taskApi";
import TaskModal from "./TaskModal";
import {
  deleteTaskGroup,
  updateTaskGroup,
  postTaskGroup,
  getTaskGroup,
} from "../../utils/taskGroupApi";
import IndivChatModal from "./IndivChatModal";

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ["red", "blue", "green"];

type CheckboxItem = {
  id: number;
  isChecked: boolean;
  content: string;
  isEditing: boolean;
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "110px",
}));

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
interface Task {
  id: string;
  taskGroupId?: string;
  description: string;
  progress: string;
  isEditing?: boolean;
}
export default function TeamTask({ projectId }: TeamTaskProps) {
  const currentDate = new Date();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [allTeamTask, setAllTeamTask] = useState([]);
  const [ongoingTeamTask, setOngoingTeamTask] = useState([]);
  const [comTeamTask, setComTeamTask] = useState([]);
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
  const handleClose = () => setOpen(false);
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

  const handleCheckboxChange = (item: Task) => () => {
    const progress = item.progress === "DONE" ? "ONGOING" : "DONE";
    const taskGroupId = item.taskGroupId || "";
    updateInTask(item.id, taskGroupId, item.description, progress);
  };
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectTask, setSelectTask] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const handleOpen = (id: any) => {
    setOpen(true);
    setSelectTask(id);
  };
  // 태스크 삭제
  const deleteInTask = async (TaskId: string) => {
    try {
      const response = await deleteTask(TaskId);
      console.log("삭제완료", response);
      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };
  // 태스크 등록
  const postInTask = async (
    chatroomId: string,
    description: string,
    progress: string
  ) => {
    try {
      const response = await postTask(chatroomId, description, progress);
      console.log(response);
      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };

  // 태스크 수정
  const updateInTask = async (
    taskId: string,
    taskGroupId: string,
    description: string,
    progress: string
  ) => {
    try {
      const response = await updateTask(
        taskId,
        taskGroupId,
        description,
        progress
      );
      console.log(response);
      setEditingTaskId(null);
      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };

  // 엔터쳤을때 태스크 입력 완
  const handleKeyPress = (TaskId: string) => async (event: any) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        window.alert("내용을 입력해주세요");
      } else {
        const chatroomId = projectId || "";
        const description = event.target.value;
        const progress = "ONGOING";
        if (TaskId === "create") {
          await postInTask(chatroomId, description, progress);
          setCheckboxItems([]);
        } else {
          console.log("수정", TaskId, "0", description, progress);
          await updateInTask(TaskId, "0", description, progress);
        }
      }
    }
  };
  const enterEditMode = async (TaskId: string) => {
    setEditingTaskId(TaskId);
    // try {
    //   const taskToEdit = allTasks.find((task) => task.id === TaskId);
    //   if (taskToEdit) {
    //     setUpdatedDescription(taskToEdit.description);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    priority: "MEDIUM",
    progress: "ONGOING",
    deadline: dayjs().add(7, "day").format("YYYY-MM-DD"),
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
      const allTasks = response.data.result[0];

      // ONGOING progress를 가진 항목 필터링
      const ongoingTasks = allTasks.filter(
        (task: any) => task.progress === "ONGOING"
      );

      // DONE progress를 가진 항목 필터링
      const completedTasks = allTasks.filter(
        (task: any) => task.progress === "DONE"
      );

      console.log(allTasks);
      console.log(ongoingTasks);
      console.log(completedTasks);

      setAllTeamTask(allTasks);
      setOngoingTeamTask(ongoingTasks);
      setComTeamTask(completedTasks);
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
    console.log(projectId);
  }, [projectId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pjt && <p className={styles.messageLeftTitle}>{pjt.name}</p>}
        <AllBorderLinearProgress
          style={{ marginTop: "29px", width: "500px" }}
          variant="determinate"
          value={(comTeamTask.length / allTeamTask.length) * 100}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ padding: "0 0 20px 20px", width: "50%" }}>
          <p className={styles.taskProgress}>완료된 Task</p>
          {comTeamTask &&
            comTeamTask.map((task: any) => (
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

                {task.taskInfoResponses.map((item: any) => (
                  <Grid
                    sx={{ margin: 0, padding: 0 }}
                    item
                    xs={12}
                    key={item.id}
                  >
                    <Item
                      sx={{
                        borderRadius: "0px 20px 20px 20px",
                        margin: "0 10px",
                        padding: 0,
                        minHeight: "30px",
                      }}
                      className={styles.oneMemo}
                      elevation={7}
                    >
                      <div className={styles.indivTask}>
                        <Checkbox
                          sx={{
                            color: "#39A789",
                            "&.Mui-checked": { color: "#39A789" },
                          }}
                          style={{ height: "20px", margin: "14px 0" }}
                          checked={item.progress === "DONE"}
                          onChange={handleCheckboxChange(item)}
                        />
                        {editingTaskId === item.id ? (
                          <input
                            onKeyPress={handleKeyPress(item.id)}
                            style={{
                              fontFamily: "preRg",
                              height: "30px",
                              marginTop: "9px",
                              border: "none",
                            }}
                            type="text"
                            // onBlur={handleContentChange(item.TaskId)}
                            placeholder="내용을 입력하세요"
                            defaultValue={item.description}
                          />
                        ) : (
                          <p
                            className={`${styles.taskContent} ${
                              item.progress === "DONE" ? styles.checked : ""
                            }`}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className={styles.icons}>
                        <div style={{ margin: "-4px 0 0 0" }}></div>
                        <div>
                          <BsFillChatDotsFill
                            onClick={() => {
                              handleOpen(item.id);
                            }}
                            style={{
                              fontSize: "17px",
                              margin: "-5px 5px 10px 0",
                            }}
                          />
                          {editingTaskId === item.id ? (
                            <BiSolidCheckCircle
                              style={{
                                fontSize: "17px",
                                margin: "-5px 3px 10px 0",
                              }}
                              // onClick={() =>
                              //   handleEditComplete(item.id, updatedDescription)
                              // }
                            />
                          ) : (
                            <BsPencilFill
                              style={{
                                fontSize: "17px",
                                margin: "-5px 3px 10px 0",
                              }}
                              onClick={() => enterEditMode(item.id)}
                            />
                          )}
                          <MdDelete
                            style={{
                              fontSize: "20px",
                              margin: "-7px 10px 8px 0",
                            }}
                            onClick={() => deleteInTask(item.id)}
                          />
                        </div>
                      </div>
                    </Item>
                  </Grid>
                ))}
              </div>
            ))}
        </div>

        <div style={{ padding: "0 20px 0 20px", width: "50%" }}>
          <p className={styles.taskProgress}>진행중인 Task</p>

          {ongoingTeamTask &&
            ongoingTeamTask.map((task: any) => (
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

                {task.taskInfoResponses.map((item: any) => (
                  <Grid
                    sx={{ margin: 0, padding: 0 }}
                    item
                    xs={12}
                    key={item.id}
                  >
                    <Item
                      sx={{
                        borderRadius: "0px 20px 20px 20px",
                        margin: "0 10px",
                        padding: 0,
                        minHeight: "30px",
                      }}
                      className={styles.oneMemo}
                      elevation={7}
                    >
                      <div className={styles.indivTask}>
                        <Checkbox
                          sx={{
                            color: "#39A789",
                            "&.Mui-checked": { color: "#39A789" },
                          }}
                          style={{ height: "20px", margin: "14px 0" }}
                          checked={item.progress === "DONE"}
                          onChange={handleCheckboxChange(item)}
                        />
                        {editingTaskId === item.id ? (
                          <input
                            onKeyPress={handleKeyPress(item.id)}
                            style={{
                              fontFamily: "preRg",
                              height: "30px",
                              marginTop: "9px",
                              border: "none",
                            }}
                            type="text"
                            // onBlur={handleContentChange(item.TaskId)}
                            placeholder="내용을 입력하세요"
                            defaultValue={item.description}
                          />
                        ) : (
                          <p
                            className={`${styles.taskContent} ${
                              item.progress === "DONE" ? styles.checked : ""
                            }`}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className={styles.icons}>
                        <div style={{ margin: "-4px 0 0 0" }}></div>
                        <div>
                          <BsFillChatDotsFill
                            onClick={() => {
                              handleOpen(item.id);
                            }}
                            style={{
                              fontSize: "17px",
                              margin: "-5px 5px 10px 0",
                            }}
                          />
                          {editingTaskId === item.id ? (
                            <BiSolidCheckCircle
                              style={{
                                fontSize: "17px",
                                margin: "-5px 3px 10px 0",
                              }}
                              // onClick={() =>
                              //   handleEditComplete(item.id, updatedDescription)
                              // }
                            />
                          ) : (
                            <BsPencilFill
                              style={{
                                fontSize: "17px",
                                margin: "-5px 3px 10px 0",
                              }}
                              onClick={() => enterEditMode(item.id)}
                            />
                          )}
                          <MdDelete
                            style={{
                              fontSize: "20px",
                              margin: "-7px 10px 8px 0",
                            }}
                            onClick={() => deleteInTask(item.id)}
                          />
                        </div>
                      </div>
                    </Item>
                  </Grid>
                ))}
              </div>
            ))}

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
      {open && <IndivChatModal taskId={selectTask} onClose={handleClose} />}
    </div>
  );
}
