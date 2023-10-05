import React from "react";
import styles from "./MessagePage.module.css";
import LeftSide from "../components/common/LeftSide";
import Message from "../components/message/Message";
import SimpleContainer from "../components/common2/IndivTask";
import { useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function MessagePage() {
  const { projectId } = useParams();
  const projectToPass = projectId || "defaultProjectId";

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
        <DndProvider backend={HTML5Backend}>
          <Message projectId={projectToPass} />
          <SimpleContainer projectId={projectToPass} />
        </DndProvider>
      </div>
    </div>
  );
}
