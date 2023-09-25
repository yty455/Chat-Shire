import React, { useState, useEffect } from "react";
import styles from "./IndivTask.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { BsPencilFill, BsCheckAll, BsFillChatDotsFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiSolidCheckCircle } from "react-icons/bi";
import { getTask, deleteTask, postTask, updateTask } from "../../utils/taskApi";
// import type { DatePickerProps } from 'antd';
// import { DatePicker, Space, Select } from 'antd';
import "./IndivTask.css";

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
  projectId?: string;
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
// // 마감일 정보
// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

// // 우선순위 정보
// const priorityHandleChange = (priority: string) => {
//   console.log(`selected ${priority}`);
// };

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

// const priorityHandleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

export default function SimpleContainer({ projectId }: SimpleContainerProps) {
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  // 수정모드 진입
  const enterEditMode = async (TaskId: string) => {
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

  // 수정완료 눌렀을 때
  const handleEditComplete = async (TaskId: string) => {
    try {
      if (projectId) {
        const taskGroupId = projectId;
        const progress = "";
        await updateInTask(TaskId, updatedDescription, taskGroupId, progress);
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
        // setCheckboxItems(response)
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
      getInTask();
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInTask();
  }, []);

  // 체크박스 추가
  const addCheckbox = () => {
    const newId = (checkboxItems.length + 1).toString();
    setCheckboxItems([
      ...checkboxItems,
      { id: newId, progress: "ONGOING", description: "", isEditing: true },
    ]);
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
          updateInTask(TaskId, "0", description, progress);
        }
        // setCheckboxItems((prevItems) =>
        //   prevItems.map((item) =>
        //     item.TaskId === TaskId
        //       ? { ...item, description, isEditing: false }
        //       : item
        //   )
        // );
      }
    }
  };

  return (
    <div className={styles.indivDiv}>
      <Box sx={{ p: 0, pt: 1 }}>
        <Grid container spacing={2}>
          {allTasks && allTasks.length !== 0 ? (
            allTasks.map((item) => (
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
                        value={item.description}
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
                    <div style={{ margin: "-4px 0 0 0" }}>
                      {/* <DatePicker style={{margin: '-8px 0 10px 7px', height: 24, fontFamily:'preRg', width:'110px'}} size="small" bordered={false} placeholder="마감일 선택" onChange={onChange} />
                      <Select
                        bordered={false} 
                        defaultValue="🔴"
                        style={{ padding: 0, width: 62, height: 24, margin: '-15px 0 10px 0' }}
                        onChange={priorityHandleChange}
                        options={[
                          { value: 'HIGH', label: '🔴' },
                          { value: 'MEDIUM', label: '🟡' },
                          { value: 'LOW', label: '🟢' },
                        ]}
                      /> */}
                    </div>
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
                          onClick={() => handleEditComplete(item.id)}
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
                    <div style={{ margin: "-4px 0 0 0" }}>
                      {/* <DatePicker style={{margin: '-8px 0 10px 7px', height: 24, fontFamily:'preRg', width:'110px'}} size="small" bordered={false} placeholder="마감일 선택" onChange={onChange} />
                      <Select
                        bordered={false} 
                        defaultValue="🔴"
                        style={{ padding: 0, width: 62, height: 24, margin: '-15px 0 10px 0' }}
                        onChange={priorityHandleChange}
                        options={[
                          { value: 'HIGH', label: '🔴' },
                          { value: 'MEDIUM', label: '🟡' },
                          { value: 'LOW', label: '🟢' },
                        ]}
                      /> */}
                    </div>
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
                          onClick={() => handleEditComplete(item.id)}
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
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
