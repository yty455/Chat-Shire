import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TeamTask from "../components/common2/TeamTask";
import IndivTask from "../components/common2/IndivTask";
import LeftSideTab from "../components/common/LeftSideTab";
import LeftSide from "../components/common/LeftSide";

export default function TaskPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <LeftSide />
      <TeamTask />
      <IndivTask />
    </div>
  );
}
