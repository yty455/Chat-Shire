import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TeamTask from "../components/common2/TeamTask";
import IndivTask from "../components/common2/IndivTask";
import LeftSide from "../components/common/LeftSide";
import { useParams } from "react-router-dom";

export default function TaskPage() {
  const { projectId } = useParams();
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
      <TeamTask />
      <IndivTask />
    </div>
  );
}
