import React from "react";
import Analysis from "../components/analysis/Analysis";
import LeftSide from "../components/common/LeftSide";
import { useParams } from "react-router-dom";

import { useRecoilState } from "recoil";
import { workStyle_recoil } from "../stores/atom";

export default function AnalysisPage() {
  const [workStyle, setWorkStyle] = useRecoilState(workStyle_recoil)
  const background =
    process.env.PUBLIC_URL + `/assets/analysisBg/${workStyle}/${workStyle}1.png`;
  const { projectId } = useParams();
  const projectToPass = projectId || "defaultProjectId";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundImage: `url(${background})`,
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
      <Analysis projectId={projectToPass} />
    </div>
  );
}
