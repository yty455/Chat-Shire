import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./CreateProject.module.css";

function First() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("");

  return (
    <div className={styles.inputbox}>
      <TextField
        fullWidth
        color="success"
        margin="dense"
        className={styles.inputtag}
        required
        id="standard-required"
        label="제목"
        defaultValue=""
        variant="standard"
        onChange={(e) => setTitle(e.target.value)}
        // helperText="Please enter your name"
      />
      <TextField
        color="success"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="주제"
        defaultValue=""
        onChange={(e) => setContent(e.target.value)}
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
        rows={3}
        onChange={(e) => setTheme(e.target.value)}
        defaultValue=""
        // helperText="Please enter your name"
      />
    </div>
  );
}

export default First;
