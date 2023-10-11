import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface searchProps {
  onSearch: (searchText: string) => void;
}

function Search({ onSearch }: searchProps) {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        height: "35px",
        width: "45%",
      }}
      style={{ margin: "1%" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontFamily: "preBd" }}
        placeholder="에러 메세지로 검색해보세요"
        inputProps={{ "aria-label": "에러 검색" }}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleEnterKeyPress}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon onClick={handleSearch} />
      </IconButton>
    </Paper>
  );
}

export default Search;
