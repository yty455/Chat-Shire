import React from "react";
import LeftSideTab from "../components/common/LeftSideTab";
import styles from "./MainPage.module.css";
import Container from "../components/common/Container";
import Project from "../components/main/Project";
import LeftSide from "../components/common/LeftSide";
import Invite from "../components/main/Invite";

function MainPage() {
  return (
    <div className={styles.bodyContainer}>
      <LeftSide />

      <Project />

      <Invite />
      {/* <LeftSideTab /> */}
      {/* <div className={styles.mainContainer}>
        <div className={styles.mainBox}>123</div>
      </div> */}
    </div>
  );
}

export default MainPage;
