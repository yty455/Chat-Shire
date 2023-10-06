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
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { getProject } from "../../utils/projectApi";
import TeamTaskCreateModal from "./TeamTaskCreateModal";
import { BsPencilFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Paper from "@mui/material/Paper";
import { BiSolidCheckCircle } from "react-icons/bi";
import {
  getTask,
  deleteTask,
  postTask,
  updateTask,
  changeTaskGroup,
} from "../../utils/taskApi";
import TaskModal from "./TaskModal";
import {
  deleteTaskGroup,
  updateTaskGroup,
  postTaskGroup,
  getTaskGroup,
} from "../../utils/taskGroupApi";
import IndivChatModal from "./IndivChatModal";
import { useRecoilState } from "recoil";
import {
  comTeamTask_recoil,
  allTeamTask_recoil,
  ongoingTeamTask_recoil,
  tasks_recoil,
} from "../../stores/atom";

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
    backgroundColor: theme.palette.mode === "light" ? "#39a789" : "#308fe8",
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
  const [allTeamTask, setAllTeamTask] = useRecoilState(allTeamTask_recoil);
  const [ongoingTeamTask, setOngoingTeamTask] = useRecoilState(
    ongoingTeamTask_recoil
  );
  const [comTeamTask, setComTeamTask] = useRecoilState(comTeamTask_recoil);
  const [allTasks, setAllTasks] = useRecoilState(tasks_recoil);
  const [pjt, setPjt] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState("");
  const [updatedProgress, setUpdatedProgress] = useState("");
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
  ]);

  // 개인 태스크 > 팀 태스크
  const indivToTeam = async (teamId: string, indivId: string) => {
    try {
      const response = await changeTaskGroup(teamId, indivId);

      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTeamTask = async (taskGroupId: any) => {
    try {
      const response = await deleteTaskGroup(taskGroupId);

      getTeamTask();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => setOpen(false);
  const openModal = (data: string | number) => {
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
  // 태스크 불러오는 함수
  const getInTask = async () => {
    try {
      if (projectId) {
        const response = await getTask(projectId);

        setAllTasks(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 수정완료 눌렀을 때
  const handleEditComplete = async (
    TaskId: string,
    updatedDescription: string
  ) => {
    try {
      if (projectId) {
        // const progress = "ONGOING";
        await updateInTask(TaskId, "0", updatedDescription, updatedProgress);
        // 편집 모드를 종료
        setEditingTaskId(null);
      } else {
        console.error("projectId is undefined.");
      }
    } catch (error) {
      console.error(error);
    }
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

      getInTask();
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

      setUpdatedDescription("");
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

      setUpdatedProgress("");
      setUpdatedDescription("");
      setEditingTaskId(null);
      getTeamTask();
      getInTask();
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
          await updateInTask(TaskId, "0", description, updatedProgress);
        }
      }
    }
  };
  const enterEditMode = async (TaskId: string, progress: string) => {
    setUpdatedProgress(progress);
    setEditingTaskId(TaskId);
    try {
      const taskToEdit = allTasks.find((task) => task.id === TaskId);
      if (taskToEdit) {
        setUpdatedDescription(taskToEdit.description);
      }
    } catch (error) {
      console.error(error);
    }
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

      setTaskData({
        name: "",
        description: "",
        priority: "MEDIUM",
        progress: "ONGOING",
        deadline: dayjs().add(7, "day").format("YYYY-MM-DD"),
      });
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
  }, [projectId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {pjt && <p className={styles.messageLeftTitle}>{pjt.name}</p>}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0px 0px 10px 20px",
          }}
        >
          <AllBorderLinearProgress
            style={{ margin: "0px 10px 0px 0px", width: "500px" }}
            variant="determinate"
            value={
              allTeamTask.length === 0
                ? 0
                : (comTeamTask.length / allTeamTask.length) * 100
            }
          />
          <span>
            {" "}
            {isNaN((comTeamTask.length / allTeamTask.length) * 100)
              ? "0%"
              : `${((comTeamTask.length / allTeamTask.length) * 100).toFixed(
                  2
                )}%`}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          className={styles.TeamTaskContainer}
          style={{ padding: "0 0 20px 20px", width: "50%", height: "510px" }}
        >
          <p className={styles.taskProgress}>완료된 Task</p>
          {comTeamTask &&
            comTeamTask.map((task: any) => (
              <div
                className={styles.taskContainer}
                key={task.id}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = e.dataTransfer.getData("taskId");
                  indivToTeam(task.id, taskId);
                }}
              >
                {/* 이 부분에서 task 객체의 속성을 사용하여 표시할 내용을 구성 */}
                <div className={styles.taskHeader}>
                  <div className={styles.clockNday}>
                    <WatchLaterIcon fontSize="medium" />
                    <p className={styles.dday}>
                      {Math.floor(
                        (new Date(task.deadline).getTime() -
                          currentDate.getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}{" "}
                      day
                    </p>
                  </div>
                  <BsPencilFill
                    style={{
                      fontSize: "17px",
                      marginLeft: "4px",
                    }}
                    onClick={() => openModal(task.id)}
                  />
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
                  <p className={styles.step}>{task.name}</p>
                  <p
                    className={styles.step}
                    style={{
                      color:
                        task.priority === "HIGH"
                          ? "#FF5B5B"
                          : task.priority === "LOW"
                          ? "#FFF05B"
                          : "#5BFF83",
                    }}
                  >
                    {task.priority}
                  </p>
                </div>
                <BorderLinearProgress
                  variant="determinate"
                  value={
                    task.taskInfoResponses.length > 0
                      ? (task.taskInfoResponses.filter(
                          (item: any) => item.progress === "DONE"
                        ).length /
                          task.taskInfoResponses.length) *
                        100
                      : 0
                  }
                />

                {task.taskInfoResponses.map((item: any) => (
                  <div style={{ margin: 0, padding: 0 }} key={item.id}>
                    <div
                      style={{
                        borderRadius: "0px 20px 20px 20px",
                        margin: "0 10px",
                        padding: 0,
                        minHeight: "30px",
                      }}
                    >
                      <div className={styles.indivTask}>
                        <div style={{ display: "flex" }}>
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
                              onChange={(e) =>
                                setUpdatedDescription(e.target.value)
                              }
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
                            <span
                              className={`${styles.taskContent} ${
                                item.progress === "DONE" ? styles.checked : ""
                              }`}
                            >
                              {item.description}
                            </span>
                          )}
                        </div>
                        <div className={styles.icons}>
                          <Tooltip title="참조 대화함 열기">
                            <BsFillChatDotsFill
                              onClick={() => {
                                handleOpen(item.id);
                              }}
                              style={{
                                fontSize: "17px",
                                marginLeft: "4px",
                              }}
                            />
                          </Tooltip>
                          {editingTaskId === item.id ? (
                            <Tooltip title="저장">
                              <BiSolidCheckCircle
                                style={{
                                  fontSize: "17px",
                                  marginLeft: "4px",
                                }}
                                onClick={() =>
                                  handleEditComplete(
                                    item.id,
                                    updatedDescription
                                  )
                                }
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="수정">
                              <BsPencilFill
                                style={{
                                  fontSize: "17px",
                                  marginLeft: "4px",
                                }}
                                onClick={() =>
                                  enterEditMode(item.id, item.progress)
                                }
                              />
                            </Tooltip>
                          )}
                          <Tooltip title="삭제">
                            <MdDelete
                              style={{
                                fontSize: "20px",
                                marginLeft: "4px",
                              }}
                              onClick={() => deleteInTask(item.id)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div
          className={styles.TeamTaskContainer}
          style={{ padding: "0 20px 0 20px", width: "50%", height: "530px" }}
        >
          <p className={styles.taskProgress}>진행중인 Task</p>

          {ongoingTeamTask &&
            ongoingTeamTask.map((task: any) => (
              <div
                className={styles.taskContainer}
                key={task.id}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = e.dataTransfer.getData("taskId");
                  console.log("개인" + taskId, "팀" + task.id);
                  indivToTeam(task.id, taskId);
                }}
              >
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
                  <BsPencilFill
                    style={{
                      fontSize: "17px",
                      marginLeft: "4px",
                    }}
                    onClick={() => openModal(task.id)}
                  />
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
                  <p className={styles.step}>{task.name}</p>
                  <p
                    className={styles.step}
                    style={{
                      color:
                        task.priority === "HIGH"
                          ? "#FF5B5B"
                          : task.priority === "LOW"
                          ? "#5BFF83"
                          : "#FFF05B",
                    }}
                  >
                    {task.priority}
                  </p>
                </div>
                <BorderLinearProgress
                  variant="determinate"
                  value={
                    task.taskInfoResponses.length > 0
                      ? (task.taskInfoResponses.filter(
                          (item: any) => item.progress === "DONE"
                        ).length /
                          task.taskInfoResponses.length) *
                        100
                      : 0
                  }
                />

                {task.taskInfoResponses.map((item: any) => (
                  <div key={item.id}>
                    <div
                      style={{
                        borderRadius: "0px 20px 20px 20px",
                        margin: "0 10px",
                        padding: 0,
                        minHeight: "30px",
                      }}
                    >
                      <div className={styles.indivTask}>
                        <div style={{ display: "flex" }}>
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
                              onChange={(e) =>
                                setUpdatedDescription(e.target.value)
                              }
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
                            <span
                              className={`${styles.taskContent} ${
                                item.progress === "DONE" ? styles.checked : ""
                              }`}
                            >
                              {item.description}
                            </span>
                          )}
                        </div>
                        <div className={styles.icons}>
                          <Tooltip title="참조 대화함 열기">
                            <BsFillChatDotsFill
                              onClick={() => {
                                handleOpen(item.id);
                              }}
                              style={{
                                fontSize: "17px",
                                marginLeft: "4px",
                              }}
                            />
                          </Tooltip>
                          {editingTaskId === item.id ? (
                            <Tooltip title="저장">
                              <BiSolidCheckCircle
                                style={{
                                  fontSize: "17px",
                                  marginLeft: "4px",
                                }}
                                onClick={() =>
                                  handleEditComplete(
                                    item.id,
                                    updatedDescription
                                  )
                                }
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="수정">
                              <BsPencilFill
                                style={{
                                  fontSize: "17px",
                                  marginLeft: "4px",
                                }}
                                onClick={() =>
                                  enterEditMode(item.id, item.progress)
                                }
                              />
                            </Tooltip>
                          )}
                          <Tooltip title="삭제">
                            <MdDelete
                              style={{
                                fontSize: "20px",
                                marginLeft: "4px",
                              }}
                              onClick={() => deleteInTask(item.id)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
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
      {open && (
        <IndivChatModal
          taskId={selectTask}
          onClose={handleClose}
          projectId={projectId}
        />
      )}
    </div>
  );
}
