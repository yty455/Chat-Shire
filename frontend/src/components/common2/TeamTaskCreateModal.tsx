import React, { useRef, useEffect } from "react";
import styles from "./TeamTaskCreateModal.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "antd";

import {MdOutlineCancel} from 'react-icons/md'

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
      <div className={styles.formContainer} style={{ color: "#575757", backgroundColor: "#ffffff", borderRadius: "20px"}}>
        <div className={styles.formBox}>
          <span style={{ fontFamily: "preBd", fontSize: "24px" }}>
            팀 태스크 생성
          </span>
          <div style={{display: "flex", alignItems: "center"}}>
            <TextField
              sx={{ width: "390px", marginTop: "14px" }}
              color="greenary"
              variant="standard"
              type="text"
              placeholder="업무 제목을 입력하세요"
              value={taskData.name}
              onChange={(e) =>
                setTaskData({ ...taskData, name: e.target.value })
              }
            />
            <FormControl
              sx={{
                height: "46px",
                minWidth: 80,
                marginLeft: "0px",
              }}
              size="medium"
              style={{ margin: "10px", marginLeft: "0px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Select
                variant="standard"
                labelId="priority-label"
                id="priority-select"
                value={taskData.priority}
                onChange={handleChange}
                sx={{ height: "30px", color: "#575757" , marginTop: "16px"}}
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
          </div>
          <div>
            <TextField
              sx={{ width: "470px", margin: "14px 0px 0px -2px" }}
              color="greenary"
              // variant="standard"
              multiline
              rows={4}
              type="text"
              placeholder="업무에 대한 설명을 입력하세요"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
          </div>
          

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div onClick={(e) => e.stopPropagation()} style={{display: "flex", flexDirection: "column"}}>
              <span style={{margin: "20px 0px 10px 0px",}}>업무 기한</span>
              <DatePicker
                value={limitDate}
                onChange={handleDateChange}
                sx={{
                  width: "200px",
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
            className={styles.savebtn}
            style={{ backgroundColor: "#39A789", fontFamily: "preRg" }}
            key="submit"
            type="primary"
            onClick={createTeampjt}
          >
            생성
          </Button>
        </div>
        <MdOutlineCancel
          style={{marginTop: "8px"}}
          size={30}
          onClick={closeModal}
          className={styles.closebtn}
        />
      </div>
    </div>
  );
}

export default TeamTaskCreateModal;
