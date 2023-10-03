import React from "react";

import styles from "./MainPage.module.css";
import Container from "../components/common/Container";
import Project from "../components/main/Project";
import LeftSide from "../components/common/LeftSide";
import Invite from "../components/main/Invite";

function MainPage() {
  return (
    // <div className={styles.bodyContainer}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F7F7F7",
      }}
    >
      <LeftSide />

      <Project />

      <Invite />
    </div>
  );
}

export default MainPage;
