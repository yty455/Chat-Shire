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
  // const [startDate, setStartDate] = useState("2023-09-14");
  // const [endDate, setEndDate] = useState("2023-09-14");

  const createProject = async () => {
    console.log(
      teamName,
      name,
      topic,
      description,
      gitRepository,
    );
    try {
      const response = await postProject(
        name,
        teamName,
        topic,
        description,
        gitRepository,
        { formattedStartDate: "2020-02-02" },
        { formattedEndDate: "2020-02-02" }
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
    <div className={styles.inputBox}>
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
        onChange={(e) => setName(e.target.value)}
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
        onChange={(e) => setTeamName(e.target.value)}
        variant="standard"
        // helperText="Please enter your name"
      />
    </div>
  );
}

export default First;
