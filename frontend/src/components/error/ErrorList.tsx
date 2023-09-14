import React from "react";
import ErrorCard from "./ErrorCard";

function ErrorList() {
  return (
    <div
      style={{
        height: "calc(100% - 80px)",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ErrorCard />
      <ErrorCard />
      <ErrorCard />
      <ErrorCard />
    </div>
  );
}

export default ErrorList;
