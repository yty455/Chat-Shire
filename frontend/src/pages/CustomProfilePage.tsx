import React, { useState } from "react";
import CustomProfile from "../components/profileSetting/CustomProfile";
import CustomProfileInfo from "../components/profileSetting/CustomProfileInfo";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

interface CustomProfilePageProps {
  onUpdateProfileColor: (color: string) => void;
  onUpdateProfileImage: (image: string) => void;
  onUpdatenickname: (nickname: string) => void;
  onUpdateintroduction: (introduction: string) => void;
  onUpdatedetailIntroduction: (detailIntroduction: string) => void;
  onUpdateposition: (position: string) => void;
  onUpdatemySkill: (mySkill: []) => void;
}

export default function CustomProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    profileImage: process.env.PUBLIC_URL + "/assets/profile/male/m25.png",
    profileColor: "",
    introduction: "",
    detailIntroduction: "",
    position: "",
    mySkill: [] as string[],
  });
  // 부모 컴포넌트에서 배경색 업데이트 함수
  const updateProfileColor = (color: string) => {
    console.log(color);
    setFormData({
      ...formData,
      profileColor: color,
    });
  };

  // 부모 컴포넌트에서 프로필 이미지 업데이트 함수
  const updateProfileImage = (image: string) => {
    console.log(image);
    setFormData({
      ...formData,
      profileImage: image,
    });
  };

  const updateNickName = (nickname: string) => {
    console.log(nickname);
    setFormData({
      ...formData,
      nickname: nickname,
    });
  };

  const updateintroduction = (introduction: string) => {
    console.log(introduction);
    setFormData({
      ...formData,
      introduction: introduction,
    });
  };

  const updatedetailIntroduction = (detailIntroduction: string) => {
    console.log(detailIntroduction);
    setFormData({
      ...formData,
      detailIntroduction: detailIntroduction,
    });
  };
  const updateposition = (position: string) => {
    console.log(position);
    setFormData({
      ...formData,
      position: position,
    });
  };
  // 부모 컴포넌트에서 프로필 이미지 업데이트 함수
  const updatemySkill = (mySkill: []) => {
    console.log(mySkill);
    setFormData({
      ...formData,
      mySkill: mySkill,
    });
  };

  const usersign = async () => {
    console.log(formData);
    try {
      const response = await api.post("/users", formData);
      console.log(response.headers["authorization"]);
      console.log(response.headers["authorization-refresh"]);
      localStorage.setItem("token", response.headers["authorization"]);
      sessionStorage.setItem(
        "refreshToken",
        response.headers["authorization-refresh"]
      );
      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

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
      <CustomProfile
        onUpdateProfileColor={updateProfileColor}
        onUpdateProfileImage={updateProfileImage}
      />
      <CustomProfileInfo
        onUpdatenickname={updateNickName}
        onUpdateintroduction={updateintroduction}
        onUpdatedetailIntroduction={updatedetailIntroduction}
        onUpdateposition={updateposition}
        onUpdatemySkill={updatemySkill}
        onUserLogin={usersign}
      />
    </div>
  );
}
