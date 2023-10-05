import React from "react";
// import ProfileTmp from "../../assets/profile/m57.png";

export default function ProfileLarge() {
  return (
    <img
      style={{
        width: "220px",
        height: "220px",
        objectFit: "cover",
        borderRadius: "140px",
        backgroundColor: "#84B5FF",
        zIndex: "5",
      }}
      src={process.env.PUBLIC_URL + "assets/profile/m57.png"}
      alt=""
    />
  );
}
