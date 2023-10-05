import React, { useState, useEffect, useRef } from "react";
import styles from "./IndivTask.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { BsPencilFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiSolidCheckCircle } from "react-icons/bi";
import { getTask, deleteTask, postTask, updateTask } from "../../utils/taskApi";
import "./IndivTask.css";
import IndivChatModal from "./IndivChatModal";
import { getTaskGroup } from "../../utils/taskGroupApi";
import { postReferences } from "../../utils/taskReferenceApi";
import { useRecoilState } from "recoil";
import {
  comTeamTask_recoil,
  allTeamTask_recoil,
  ongoingTeamTask_recoil,
  tasks_recoil,
} from "../../stores/atom";

interface ItemState {
  id: number;
  taskGroupId: number;
  description: string;
  progress: string;
}

type CheckboxItem = {
  id: string;
  taskGroupId?: string;
  description: string;
  isEditing?: boolean;
  progress: string;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "110px",
}));

interface SimpleContainerProps {
  projectId: string;
}
interface taskInfo {
  description: string;
}
interface Task {
  id: string;
  taskGroupId?: string;
  description: string;
  progress: string;
  isEditing?: boolean;
}

export default function SimpleContainer({ projectId }: SimpleContainerProps) {
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [allTasks, setAllTasks] = useRecoilState(tasks_recoil);
  const [allTeamTask, setAllTeamTask] = useRecoilState(allTeamTask_recoil);
  const [ongoingTeamTask, setOngoingTeamTask] = useRecoilState(
    ongoingTeamTask_recoil
  );
  const [comTeamTask, setComTeamTask] = useRecoilState(comTeamTask_recoil);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [selectTask, setSelectTask] = useState(false);

  const handleOpen = (id: any) => {
    setOpen(true);
    setSelectTask(id);
  };
  const handleClose = () => setOpen(false);

  const enterEditMode = async (TaskId: string) => {
    setEditingTaskId(TaskId);
    try {
      const taskToEdit = allTasks.find((task) => task.id === TaskId);
      if (taskToEdit) {
        setUpdatedDescription(taskToEdit.description);

        // 편집 모드로 진입할 때 입력 필드에 포커스를 설정합니다.
        if (inputRef.current) {
          inputRef.current.focus();
        }
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
        const progress = "ONGOING";
        await updateInTask(TaskId, "0", updatedDescription, progress);
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

  // 태스크 불러오는 함수
  const getInTask = async () => {
    try {
      if (projectId) {
        const response = await getTask(projectId);
        console.log(response.data.result[0]);

        setAllTasks(response.data.result[0]);
      }
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
      setUpdatedDescription("");
      getInTask();
    } catch (error) {
      console.error(error);
    }
  };

  // 드래그 태스크 등록
  const postDragTask = async (
    chatroomId: string,
    description: string,
    progress: string,
    nickname: string,
    content: string,
    chatNumber: number,
    chatTime: string
  ) => {
    try {
      const response = await postTask(chatroomId, description, progress);
      console.log(response.data.result[0]);
      postInReferences(
        response.data.result[0],
        nickname,
        content,
        chatNumber,
        chatTime
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 참조 등록
  const postInReferences = async (
    taskId: string,
    nickname: string,
    content: string,
    chatNumber: number,
    chatTime: string
  ) => {
    try {
      const response = await postReferences(
        taskId,
        nickname,
        content,
        chatNumber,
        chatTime
      );
      console.log(response);
      getInTask();
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
      setUpdatedDescription("");
      setEditingTaskId(null);
      getInTask();
      getTeamTask();
    } catch (error) {
      console.error(error);
    }
  };

  // 태스크 삭제
  const deleteInTask = async (TaskId: string) => {
    try {
      const response = await deleteTask(TaskId);
      console.log("삭제완료", response);
      getInTask();
      getTeamTask();
    } catch (error) {
      console.error(error);
    }
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
      getInTask();
      setAllTeamTask(allTasks);
      setOngoingTeamTask(ongoingTasks);
      setComTeamTask(completedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInTask();
  }, [projectId]);

  // 체크박스 추가
  const addCheckbox = () => {
    if (checkboxItems.length === 0) {
      const newId = "1";
      setCheckboxItems([
        { id: newId, progress: "ONGOING", description: "", isEditing: true },
      ]);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 내용 작성 완료
  const handleContentChange = (TaskId: String) => (event: any) => {
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === TaskId
          ? { ...item, description: event.target.value, isEditing: false }
          : item
      )
    );
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

  return (
    <div className={styles.indivDiv}>
      <Box sx={{ p: 0, pt: 1 }}>
        <Grid container spacing={2}>
          {allTasks && allTasks.length !== 0 ? (
            allTasks.map((item) => (
              <Grid
                sx={{ margin: 0, padding: 0 }}
                item
                xs={12}
                key={item.id}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("taskId", item.id);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const rawMessage = e.dataTransfer.getData("message");
                  const message = JSON.parse(rawMessage);
                  const nickname = e.dataTransfer.getData("nickname");
                  postInReferences(
                    item.id,
                    nickname,
                    message?.content,
                    message?.chatNumber,
                    message?.chatTime
                  );
                }}
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
                        ref={inputRef}
                        // value={updatedDescription}
                        onKeyPress={handleKeyPress(item.id)}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
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
                        style={{ fontSize: "17px", margin: "-5px 5px 10px 0" }}
                      />
                      {editingTaskId === item.id ? (
                        <BiSolidCheckCircle
                          style={{
                            fontSize: "17px",
                            margin: "-5px 3px 10px 0",
                          }}
                          onClick={() =>
                            handleEditComplete(item.id, updatedDescription)
                          }
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
                        style={{ fontSize: "20px", margin: "-7px 10px 8px 0" }}
                        onClick={() => deleteInTask(item.id)}
                      />
                    </div>
                  </div>
                </Item>
              </Grid>
            ))
          ) : (
            <p
              style={{
                color: "grey",
                fontFamily: "preBd",
                margin: "30px auto 0 auto",
                paddingLeft: "10px",
              }}
            >
              아직 등록된 태스크가 없습니다.
            </p>
          )}
          {checkboxItems && checkboxItems.length !== 0 ? (
            checkboxItems.map((item) => (
              <Grid sx={{ margin: 0, padding: 0 }} item xs={12} key={item.id}>
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
                    {item.isEditing ? (
                      <input
                        ref={inputRef}
                        onKeyPress={handleKeyPress("create")}
                        style={{
                          fontFamily: "preRg",
                          height: "30px",
                          marginTop: "9px",
                          border: "none",
                        }}
                        type="text"
                        // onBlur={handleContentChange(item.TaskId)}
                        placeholder="내용을 입력하세요"
                        // value={updatedDescription}
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
                        style={{ fontSize: "17px", margin: "-5px 5px 10px 0" }}
                      />
                      {editingTaskId === item.id ? (
                        <BiSolidCheckCircle
                          style={{
                            fontSize: "17px",
                            margin: "-5px 3px 10px 0",
                          }}
                          // onClick={() => handleEditComplete(item.id)}
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
                        style={{ fontSize: "20px", margin: "-7px 10px 8px 0" }}
                        onClick={() => deleteInTask(item.id)}
                      />
                    </div>
                  </div>
                </Item>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Box>
      <Fab
        style={{ zIndex: 2 }}
        sx={{
          mb: "20px",
          mt: "20px",
          mr: "auto",
          ml: "auto",
          display: "flex",
          justifyContent: "center",
        }}
        color="greenary"
        aria-label="add"
        onClick={addCheckbox}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          const rawMessage = e.dataTransfer.getData("message");
          const message = JSON.parse(rawMessage);
          const nickname = e.dataTransfer.getData("nickname");
          console.log(message, nickname);
          postDragTask(
            projectId,
            "임시태스크",
            "ONGOING",
            nickname,
            message?.content,
            message?.chatNumber,
            message?.chatTime
          );
        }}
      >
        <AddIcon />
      </Fab>
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
