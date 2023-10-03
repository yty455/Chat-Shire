import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TeamTask from "../components/common2/TeamTask";
import IndivTask from "../components/common2/IndivTask";
import LeftSide from "../components/common/LeftSide";
import { useParams } from "react-router-dom";
import { changeTaskGroup } from "../utils/taskApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function TaskPage() {
  const { projectId } = useParams();
  const projectToPass = projectId || "defaultProjectId";
  console.log(projectToPass);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <LeftSide />
      <DndProvider backend={HTML5Backend}>
        <TeamTask projectId={projectToPass} />
        <IndivTask projectId={projectToPass} />
      </DndProvider>
    </div>
  );
}
