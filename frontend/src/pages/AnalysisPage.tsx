import React from "react";
import Analysis from "../components/analysis/Analysis";
import LeftSide from "../components/common/LeftSide";
import { useParams } from "react-router-dom";

export default function AnalysisPage() {
  const passion =
    process.env.PUBLIC_URL + "/assets/analysisBg/passion/passion1.png";
  const { projectId } = useParams();
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
