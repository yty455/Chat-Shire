import React from "react";
import Analysis from "../components/analysis/Analysis";
import passion from "../assets/passion.png";

export default function AnalysisPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${passion})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          border: "1px solid #ffffff95",
          backgroundColor: "#ffffff2a",
          width: "200px",
          height: "630px",
          padding: "30px",
          marginRight: "30px",
          borderRadius: "30px",
        }}
      ></div>
      <Analysis />
    </div>
  );
}
