import React from "react";
import LeftSide from "../components/common/LeftSide";
import Invite from "../components/main/Invite";
import CreateProject from "../components/createproject/CreateProject";
import styles from "./CreateProjectPage.module.css";

function CreateProjectPage() {
  return (
    <div className={styles.bodyContainer}>
      <LeftSide />
      <CreateProject />
      <Invite />
    </div>
  );
}

export default CreateProjectPage;
