import React from "react";
import styles from "./MessagePage.module.css";
import LeftSide from "../components/common/LeftSide";
import Message from "../components/message/Message";
import IndivTask from "../components/common2/IndivTask";

export default function MessagePage() {
  return (
    <div>
      <LeftSide />
      <div className={styles.messagePageContainer}>
        <Message />
        {/* <IndivTask/> */}
      </div>
    </div>
  );
}
