import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./CreateProject.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./Example";

function Second() {
  return (
    <div className={styles.memberContainer}>
      <div className={styles.memberBox}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            // width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="팀원들을 검색하여 추가하세요"
            inputProps={{ "aria-label": "팀원 검색" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <DndProvider backend={HTML5Backend}>
          <Example />
        </DndProvider>
      </div>
      <div className={styles.memberBox}></div>
    </div>
  );
}

export default Second;
