import React from "react";
import Tooltip from "@mui/material/Tooltip";

export default function Achievement() {
  return (
    <Tooltip title="업적" arrow>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "64px",
          height: "64px",
          backgroundColor: "#E5E8EB",
          borderRadius: "60px",
          margin: "0px 16px 16px 0px",
          padding: "6px",
        }}
      >
        축하행
      </div>
    </Tooltip>
  );
}
