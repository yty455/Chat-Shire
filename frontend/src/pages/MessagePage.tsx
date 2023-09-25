import React from "react";
import styles from "./MessagePage.module.css";
import LeftSide from "../components/common/LeftSide";
import Message from "../components/message/Message";
import SimpleContainer from "../components/common2/IndivTask";
import { useParams } from "react-router-dom";

export default function MessagePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.messagePageContainer}>
        <LeftSide />
        <Message/>
        <SimpleContainer/>
      </div>
    </div>
  );
}
