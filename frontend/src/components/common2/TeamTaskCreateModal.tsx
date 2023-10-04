import React, { useRef, useEffect } from "react";
import styles from "./TeamTaskCreateModal.module.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "antd";

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

interface TeamTaskCreateModalProps {
  taskData: any;
  closeModal: () => void;
  createTeampjt: () => Promise<void>;
  setTaskData: (taskData: any) => void;
}

function TeamTaskCreateModal({
  taskData,
  closeModal,
  createTeampjt,
  setTaskData,
}: TeamTaskCreateModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (event: SelectChangeEvent) => {
    const selectedPriority = event.target.value as string;
    setTaskData({ ...taskData, priority: selectedPriority });
  };
  const [limitDate, setLimitDate] = React.useState<Dayjs | null>(
    dayjs().add(7, "day")
  );

  const handleDateChange = (newDate: Dayjs | null) => {
    setLimitDate(newDate);
    const formattedLimitDate = newDate ? newDate.format("YYYY-MM-DD") : "";
    setTaskData({ ...taskData, deadline: formattedLimitDate });
  };

  // useEffect(() => {
  //   const handleOutsideClick = (event: any) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       // 모달 외부를 클릭한 경우 모달을 닫음
  //       closeModal();
  //     }
  //   };
  //   // 이벤트 리스너 추가
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [closeModal]);

  return (
    <div className={styles.modalOverlay} ref={modalRef}>
      <div className={styles.formContainer}>
        <div>
          <h2>팀 태스크 생성</h2>
          <div>
            <input
              type="text"
              placeholder="태스크 이름"
              value={taskData.name}
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="태스크 상세설명"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
          </div>
          <div>
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
                value={taskData.priority}
                onChange={handleChange}
                sx={{
                  color: getPriorityColor(taskData.priority),
                  marginLeft: "0px",
                }}
              >
                <MenuItem value="HIGH" sx={{ color: "red" }}>
                  🔴
                </MenuItem>
                <MenuItem value="MEDIUM" sx={{ color: "green" }}>
                  🟢
                </MenuItem>
                <MenuItem value="LOW" sx={{ color: "orange" }}>
                  🟡
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div onClick={(e) => e.stopPropagation()}>
              <DatePicker
                value={limitDate}
                onChange={handleDateChange}
                sx={{
                  width: "150px",
                  height: "16px",
                  margin: "10px",
                  marginLeft: "0px",
                }}
              />
            </div>
          </LocalizationProvider>
          {/* <input
        type="text"
        value={taskData.deadline}
        onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
      /> */}

          <Button
            style={{ backgroundColor: "#39A789", fontFamily: "preRg" }}
            key="submit"
            type="primary"
            onClick={createTeampjt}
          >
            생성
          </Button>
        </div>
        <button
          style={{ cursor: "pointer" }}
          onClick={closeModal}
          className={styles.closebtn}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default TeamTaskCreateModal;
