import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./First.module.css";
import { postProject } from "../../utils/apiService";

function First() {
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepository, setGitRepository] = useState("");
  const [startDate, setStartDate] = useState("2023-09-14");
  const [endDate, setEndDate] = useState("2023-09-14");

  const createProject = async () => {
    try {
      const response = await postProject(
        name,
        teamName,
        topic,
        description,
        gitRepository,
        startDate,
        endDate
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    createProject();
  };

  return (
    <div className={styles.inputbox}>
      <TextField
        fullWidth
        color="success"
        margin="dense"
        className={styles.inputtag}
        required
        id="standard-required"
        label="프로젝트 이름"
        defaultValue=""
        variant="standard"
        onChange={(e) => setName(e.target.value)}
        // helperText="Please enter your name"
      />
      <TextField
        color="success"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="팀 이름"
        defaultValue=""
        onChange={(e) => setTeamName(e.target.value)}
        variant="standard"
        // helperText="Please enter your name"
      />
      <TextField
        color="success"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="프로젝트 주제"
        defaultValue=""
        onChange={(e) => setTopic(e.target.value)}
        variant="standard"
        // helperText="Please enter your name"
      />
      <TextField
        color="success"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="깃 등록"
        defaultValue=""
        onChange={(e) => setGitRepository(e.target.value)}
        variant="standard"
        // helperText="Please enter your name"
      />
      <TextField
        fullWidth
        color="success"
        margin="normal"
        className={styles.inputtag}
        required
        id="outlined-multiline-static"
        label="설명"
        multiline
        rows={2}
        onChange={(e) => setDescription(e.target.value)}
        defaultValue=""
        // helperText="Please enter your name"
      />

      <button
        onClick={() => {
          handleClick();
        }}
      >
        생성
      </button>
    </div>
  );
}

export default First;
