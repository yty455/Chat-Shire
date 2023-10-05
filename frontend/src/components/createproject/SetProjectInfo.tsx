import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import styles from "./SetProjectInfo.module.css";

export default function SetProjectInfo({
  onData,
}: {
  onData: (topic: string, description: string) => void;
}) {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  // 입력 값이 변경될 때마다 상태 업데이트
  const handleTopicChange = (e: any) => {
    setTopic(e.target.value);
    // 변경된 값 전달
    onData(e.target.value, description);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
    // 변경된 값 전달
    onData(topic, e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", border: "none", width: "600px" }}>
      <TextField
        color="greenary"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="프로젝트 주제"
        defaultValue=""
        onChange={handleTopicChange}
        variant="standard"
        // helperText="Please enter your name"
      />

      <TextField
        fullWidth
        color="greenary"
        margin="normal"
        className={styles.inputTag}
        required
        id="outlined-multiline-static"
        label="설명"
        multiline
        rows={2}
        onChange={handleDescriptionChange}
        defaultValue=""
        // helperText="Please enter your name"
      />
    </div>
  );
}
