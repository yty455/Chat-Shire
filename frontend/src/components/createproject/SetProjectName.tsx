import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./SetProjectName.module.css";

function SetProjectName({
  onData,
}: {
  onData: (name: string, teamName: string) => void;
}) {
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");

  // 입력 값이 변경될 때마다 상태 업데이트
  const handleNameChange = (e: any) => {
    setName(e.target.value);
    // 변경된 값 전달
    onData(e.target.value, teamName);
  };

  const handleTeamNameChange = (e: any) => {
    setTeamName(e.target.value);
    // 변경된 값 전달
    onData(name, e.target.value);
  };
  return (
    <div
      className={styles.inputBox}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "none",
        width: "600px",
      }}
    >
      <TextField
        fullWidth
        color="greenary"
        margin="dense"
        className={styles.inputTag}
        required
        id="standard-required"
        label="프로젝트 이름"
        defaultValue=""
        variant="standard"
        onChange={handleNameChange}
        // helperText="Please enter your name"
      />
      <TextField
        color="greenary"
        margin="dense"
        fullWidth
        className={styles.inputTag}
        required
        id="standard-required"
        label="팀 이름"
        defaultValue=""
        onChange={handleTeamNameChange}
        variant="standard"
        inputProps={{ maxLength: 5 }}
        // helperText="Please enter your name"
      />
    </div>
  );
}

export default SetProjectName;
