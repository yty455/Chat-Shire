import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from "./SetDate.module.css";

export default function SetDate({ onData }: { onData: (startDate: string, endDate: string) => void;}) {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs().add(1, "week")
  );

  const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD") : "";
  const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";
  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
    onData(newValue?.format("YYYY-MM-DD") || "", formattedEndDate);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
    onData(formattedStartDate, newValue?.format("YYYY-MM-DD") || "");
  };

  return (
    <div style={{display: "flex", justifyContent: "space-between", border: "none", width: "600px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={startDate} onChange={handleStartDateChange} />
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          className={styles.datepicker}
        />
      </LocalizationProvider>
    </div>
  );
}
