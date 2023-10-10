import React, { useState, useRef, useEffect } from "react";
import styles from "./TaskModal.module.css";
import { getTaskGroupDetail } from "../../utils/taskGroupApi";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "antd";
import { TextField, FormControl, MenuItem } from "@mui/material";

import {MdOutlineCancel} from 'react-icons/md'
interface TaskModalProps {
  closeModal: () => void;
  taskId: string | number;
  deleteTeamTask: (taskGroupId: any) => Promise<void>;
  updateTeamTask: (taskGroupId: any, data: any) => Promise<void>;
}

function getPriorityColor(priority: any) {
  switch (priority) {
    case "HIGH":
      return "red";
    case "MEDIUM":
      return "green";
    case "LOW":
      return "orange";
    default:
      return "black";
  }
}

interface TeamTaskDetail {
  id: string;
  name: string;
  description: string;
  priority: string;
  progress: string;
  deadline: string;
  taskInfoDetailResponses: [];
}

function TaskModal({
  closeModal,
  taskId,
  deleteTeamTask,
  updateTeamTask,
}: TaskModalProps) {
  const [teamTaskDetail, setTeamTaskDetail] = useState<TeamTaskDetail | null>(
    null
  );
  const [editingField, setEditingField] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const getTeamTask = async () => {
    try {
      const response = await getTaskGroupDetail(taskId);
      setTeamTaskDetail(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeamTask();
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // 모달 외부를 클릭한 경우 모달을 닫음
        closeModal();
      }
    };
    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleOutsideClick);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const handleSaveClick = async (field: keyof TeamTaskDetail) => {
    if (teamTaskDetail) {
      const updatedData = { ...teamTaskDetail, [field]: teamTaskDetail[field] };
      await updateTeamTask(teamTaskDetail.id, updatedData);
      setEditingField(null);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <span style={{fontFamily: "preBd", fontSize: "24px"}}>태스크 편집</span>
        {teamTaskDetail && (
          <div className={styles.modalContent}>
            <div style={{display: "flex", alignItems: "center"}}>
              <span style={{fontFamily: "preBd", fontSize: "24px", marginBottom: "20px"}} onClick={() => handleEditClick("name")}>
                <TextField
                  onClick={() => handleEditClick("name")}
                  sx={{ width: "340px", margin: "14px 0px 0px -2px" }}
                  color="greenary"
                  variant="standard"
                  multiline
                  rows={1}
                  type="text"
                  placeholder="업무에 대한 설명을 입력하세요"
                  value={teamTaskDetail.name}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      name: e.target.value,
                    })
                  }
                />
              </span>
              <span style={{fontFamily: "preRg", fontSize: "16px", marginBottom: "3px"}} onClick={() => handleEditClick("priority")}>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 80,
                    maxWidth: 80,
                    marginLeft: "0px",
                  }}
                  size="small"
                  style={{ margin: "10px", marginLeft: "0px" }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditClick("priority")
                  }}
                >
                  <Select
                    labelId="priority-label"
                    id="priority-select"
                    variant="standard"
                    value={teamTaskDetail.priority}
                    onChange={(e) =>
                      setTeamTaskDetail({
                        ...teamTaskDetail,
                        priority: e.target.value,
                      })
                    }
                    sx={{
                      color: getPriorityColor(teamTaskDetail.priority),
                      marginLeft: "0px",
                    }}
                  >
                    <MenuItem value="HIGH" style={{ paddingLeft: "2px" }}>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "30px",
                            backgroundColor: "#FF5B5B",
                            marginRight: "6px",
                          }}
                        />
                        <span>매우 중요</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="MEDIUM" style={{ paddingLeft: "2px" }}>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "30px",
                            backgroundColor: "#FFF05B",
                            marginRight: "6px",
                          }}
                        />
                        <span>중요</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="LOW" style={{ paddingLeft: "2px" }}>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "30px",
                            backgroundColor: "#5BFF83",
                            marginRight: "6px",
                          }}
                        />
                        <span>보통</span>
                      </div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </span>
            </div>
            <span style={{fontFamily: "preRg", fontSize: "16px", marginBottom: "20px"}} onClick={() => handleEditClick("description")}>
              <TextField
                onClick={() => handleEditClick("description")}
                sx={{ width: "420px", margin: "14px 0px 0px -2px" }}
                color="greenary"
                // variant="standard"
                multiline
                rows={4}
                type="text"
                placeholder="업무에 대한 설명을 입력하세요"
                value={teamTaskDetail.description}
                onChange={(e) =>
                  setTeamTaskDetail({
                    ...teamTaskDetail,
                    description: e.target.value,
                  })
                }
              />
            </span>
            <span style={{fontFamily: "preBd", fontSize: "20px", marginBottom: "20px"}} onClick={() => handleEditClick("deadline")}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(teamTaskDetail.deadline)}
                  onChange={(date: any) => {
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      deadline: date,
                    });
                  }}
                  sx={{
                    width: "150px",
                    height: "16px",
                    margin: "10px",
                    marginLeft: "0px",
                  }}
                />
              </LocalizationProvider>
            </span>
            <MdOutlineCancel
              style={{marginTop: "8px", cursor: "pointer"}}
              size={30}
              onClick={closeModal}
              className={styles.closebtn}
            />
          </div>
        )}

        {editingField ? (
          <Button
            className={styles.savebtn}
            style={{ fontFamily: "preRg", margin: "0px 14px 14px 0px", width: "200px", height: "50px" }}
            key="submit"
            type="primary"
            onClick={() => {
              if (
                editingField === "name" ||
                editingField === "description" ||
                editingField === "priority" ||
                editingField === "progress" ||
                editingField === "deadline"
              ) {
                handleSaveClick(editingField);
              }
            }}
          >
            저장
          </Button>
        ) : (
          <Button
            className={styles.deletebtn}
            style={{ backgroundColor: "rgb(255, 91, 91)", fontFamily: "preRg", margin: "0px 14px 14px 0px", width: "200px", height: "50px" }}
            key="submit"
            type="primary"
            onClick={() => teamTaskDetail && deleteTeamTask(teamTaskDetail.id)}
          >
            팀 태스크 삭제
          </Button>
        )}
      </div>
    </div>
  );
}

export default TaskModal;
