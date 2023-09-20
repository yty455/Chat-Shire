import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import styles from "./Second.module.css";

export default function Second({
  onData,
}: {
  onData: (topic: string, gitRepository: string, description: string) => void;
}) {
  const [topic, setTopic] = useState("");
  const [gitRepository, setGitRepository] = useState("");
  const [description, setDescription] = useState("");

  // 입력 값이 변경될 때마다 상태 업데이트
  const handleTopicChange = (e: any) => {
    setTopic(e.target.value);
    // 변경된 값 전달
    onData(e.target.value, gitRepository, description);
  };

  const handleGitRepositoryChange = (e: any) => {
    setGitRepository(e.target.value);
    // 변경된 값 전달
    onData(topic, e.target.value, description);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
    // 변경된 값 전달
    onData(topic, gitRepository, e.target.value);
  };

  return (
    <div>
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
        color="greenary"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="깃 등록"
        defaultValue=""
        onChange={handleGitRepositoryChange}
        variant="standard"
        // helperText="Please enter your name"
      />
      <TextField
        fullWidth
        color="greenary"
        margin="normal"
        className={styles.inputtag}
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
