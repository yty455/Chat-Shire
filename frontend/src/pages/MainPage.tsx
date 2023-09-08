import React from "react";
import LeftSideTab from "../components/common/LeftSideTab";
import styles from "./MainPage.module.css";

function MainPage() {
  return (
    <div className={styles.bodyContainer}>
      <LeftSideTab />
      <div className={styles.mainContainer}>123</div>
    </div>
  );
}

export default MainPage;
