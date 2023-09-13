import React from "react";
import { useRecoilState } from "recoil";
import Search from "./Search";
import Container from "../common/Container";
import MultiSelect from "./MultiSelect";
// import styles from "./Idea.module.css";
import ErrorList from "./ErrorList";
function Error() {
  return (
    <Container
      backgroundColor="white"
      text=""
      width="850px"
      height="550px"
      margin=""
      padding=""
      borderRadius="20px"
      display=""
      justifyContent=""
      boxShadow="0 8px 10px 0 rgba(131, 131, 131, 0.37)"
      backdropFilter="blur(7px)"
      transition="all 0.2s ease-in-out"
    >
      <div
        style={{
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MultiSelect />
        <Search />
      </div>
      <ErrorList />
    </Container>
  );
}

export default Error;
