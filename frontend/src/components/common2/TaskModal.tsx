import React, { useState, useRef, useEffect } from "react";
import styles from "./TaskModal.module.css";
import { getTaskGroupDetail } from "../../utils/taskGroupApi";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { FormControl, InputLabel, MenuItem } from "@mui/material";

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
      console.log(response.data.result[0]);
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
      <div>
        {teamTaskDetail && (
          <div className={styles.modalContent}>
            <p>{taskId}</p>
            <p onClick={() => handleEditClick("name")}>
              {editingField === "name" ? (
                <input
                  type="text"
                  value={teamTaskDetail.name}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.name
              )}
            </p>
            <p onClick={() => handleEditClick("description")}>
              {editingField === "description" ? (
                <input
                  type="text"
                  value={teamTaskDetail.description}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.description
              )}
            </p>

            <p onClick={() => handleEditClick("priority")}>
              {editingField === "priority" ? (
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                    marginLeft: "0px",
                  }}
                  size="small"
                  style={{ margin: "10px", marginLeft: "0px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority-select"
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
                    <MenuItem value="HIGH" sx={{ color: "red" }}>
                      High
                    </MenuItem>
                    <MenuItem value="MEDIUM" sx={{ color: "green" }}>
                      Medium
                    </MenuItem>
                    <MenuItem value="LOW" sx={{ color: "orange" }}>
                      Low
                    </MenuItem>
                  </Select>
                </FormControl>
              ) : (
                teamTaskDetail.priority
              )}
            </p>
            <p onClick={() => handleEditClick("progress")}>
              {editingField === "progress" ? (
                <input
                  type="text"
                  value={teamTaskDetail.progress}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      progress: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.progress
              )}
            </p>
            <p onClick={() => handleEditClick("deadline")}>
              {editingField === "deadline" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DatePicker
                      value={teamTaskDetail.deadline}
                      onChange={(date: any) => {
                        setTeamTaskDetail({
                          ...teamTaskDetail,
                          deadline: date.toLocaleDateString(), // ISO 형식으로 변환
                        });
                      }}
                      sx={{
                        width: "150px",
                        height: "16px",
                        margin: "10px",
                        marginLeft: "0px",
                      }}
                    />
                  </div>
                </LocalizationProvider>
              ) : (
                teamTaskDetail.deadline
              )}
            </p>
            {editingField && (
              <button
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
              </button>
            )}
            <button onClick={closeModal}>닫기</button>
          </div>
        )}
        <button
          onClick={() => teamTaskDetail && deleteTeamTask(teamTaskDetail.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
