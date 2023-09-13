import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        height: "50px",
        width: "60%",
      }}
      style={{ margin: "1%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="에러 메세지를 검색하세요"
        inputProps={{ "aria-label": "에러 검색" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
