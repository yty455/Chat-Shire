import React from "react";
import Analysis from "../components/analysis/Analysis";
import passion from "../assets/analysisBg/passion/passion.png";
import LeftSide from "../components/common/LeftSide";

export default function AnalysisPage() {
  console.log(visualViewport)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundImage: `url(${passion})`,
        backgroundSize: "cover",
      }}
    >
      {/* <div
        style={{
          border: "1px solid #ffffff95",
          backgroundColor: "#ffffff2a",
          width: "200px",
          height: "630px",
          padding: "30px",
          marginRight: "30px",
          borderRadius: "30px",
        }}
      ></div> */}
      <LeftSide />
      <Analysis />
    </div>
  );
}
