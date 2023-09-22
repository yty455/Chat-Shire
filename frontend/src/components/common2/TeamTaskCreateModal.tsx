import React from "react";
import styles from "./TeamTaskCreateModal.module.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
  const handleChange = (event: SelectChangeEvent) => {
    const selectedPriority = event.target.value as string;
    setTaskData({ ...taskData, priority: selectedPriority });
  };
  const [limitDate, setLimitDate] = React.useState<Dayjs | null>(dayjs());

  const handleDateChange = (newDate: Dayjs | null) => {
    setLimitDate(newDate);
    const formattedLimitDate = newDate ? newDate.format("YYYY-MM-DD") : "";
    setTaskData({ ...taskData, deadline: formattedLimitDate });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.formContainer}>
        <h2>팀 태스크 생성</h2>
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

        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          style={{ margin: "20px" }}
        >
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority-select"
            value={taskData.priority}
            onChange={handleChange}
          >
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={limitDate}
            onChange={handleDateChange}
            sx={{ width: "150px", height: "16px", margin: "20px" }}
          />
        </LocalizationProvider>
        {/* <input
        type="text"
        value={taskData.deadline}
        onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
      /> */}

        <button onClick={createTeampjt} style={{ margin: "20px" }}>
          생성
        </button>
      </div>
    </div>
  );
}

export default TeamTaskCreateModal;
