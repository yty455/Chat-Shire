import React, { useEffect } from "react";

import Project from "../components/main/Project";
import LeftSide from "../components/common/LeftSide";
import Invite from "../components/main/Invite";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const refresh_token = sessionStorage.getItem("refresh_token");
    if (!refresh_token) {
      navigate("/profile/custom");
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F7F7F7",
      }}
    >
      <LeftSide />

      <Project />

      <Invite />
    </div>
  );
}

export default MainPage;
