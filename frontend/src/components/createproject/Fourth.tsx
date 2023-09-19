import React from 'react'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from './Fourth.module.css'


export default function Fourth() {  
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs().add(1, "week")
  );

  const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD") : "";
  const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          className={styles.datepicker}
        />
      </LocalizationProvider>
    </div>
  )
}
