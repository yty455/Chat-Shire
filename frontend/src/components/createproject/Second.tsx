import React, { useState } from 'react'
import TextField from "@mui/material/TextField";

import styles from './Second.module.css'

export default function Second() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepository, setGitRepository] = useState("");

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
        onChange={(e) => setTopic(e.target.value)}
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
        onChange={(e) => setGitRepository(e.target.value)}
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
        onChange={(e) => setDescription(e.target.value)}
        defaultValue=""
        // helperText="Please enter your name"
      />
  </div>
  )
}
