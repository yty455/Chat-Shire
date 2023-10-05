import React, { useState } from "react";
import CustomProfile from "../components/profileSetting/CustomProfile";
import CustomProfileInfo from "../components/profileSetting/CustomProfileInfo";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useRecoilState } from "recoil";
import { loginuser, isLogin_recoil } from "../stores/atom";
import { getProfile } from "../utils/userApi";

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
  const [userData, setUserData] = useRecoilState(loginuser);
  const [isLogin, setIsLogin] = useRecoilState(isLogin_recoil);

  const [formData, setFormData] = useState({
    nickname: userData && userData.nickname ? userData.nickname : "",
    profileImage:
      userData && userData.profileImage
        ? process.env.PUBLIC_URL + userData.profileImage
        : process.env.PUBLIC_URL + "/assets/profile/male/m25.png",

    profileColor:
      userData && userData.profileColor ? userData.profileColor : "",
    introduction:
      userData && userData.introduction ? userData.introduction : "",
    detailIntroduction:
      userData && userData.detailIntroduction
        ? userData.detailIntroduction
        : "",
    position: userData && userData.position ? userData.position : "",
    mySkill: userData && userData.mySkill ? userData.mySkill : ([] as string[]),
  });
  // 부모 컴포넌트에서 배경색 업데이트 함수
  const updateProfileColor = (color: string) => {
    setFormData({
      ...formData,
      profileColor: color,
    });
  };

  // 부모 컴포넌트에서 프로필 이미지 업데이트 함수
  const updateProfileImage = (image: string) => {
    setFormData({
      ...formData,
      profileImage: image,
    });
  };

  const updateNickName = (nickname: string) => {
    setFormData({
      ...formData,
      nickname: nickname,
    });
  };

  const updateintroduction = (introduction: string) => {
    setFormData({
      ...formData,
      introduction: introduction,
    });
  };

  const updatedetailIntroduction = (detailIntroduction: string) => {
    setFormData({
      ...formData,
      detailIntroduction: detailIntroduction,
    });
  };
  const updateposition = (position: string) => {
    setFormData({
      ...formData,
      position: position,
    });
  };
  // 부모 컴포넌트에서 프로필 이미지 업데이트 함수
  const updatemySkill = (mySkill: []) => {
    setFormData({
      ...formData,
      mySkill: mySkill,
    });
  };

  const userSign = async () => {
    try {
      setUserData(formData);
      setIsLogin(true);
      const response = await api.post("/users", formData);
      localStorage.setItem("token", response.headers["authorization"]);
      sessionStorage.setItem(
        "refresh_token",
        response.headers["authorization-refresh"]
      );
      setUserData(formData);
      setIsLogin(true);
      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

  const getProfilePage = async () => {
    try {
      const response = await getProfile();
      console.log(response.data.result[0]);
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const userUpdate = async () => {
    try {
      const response = await api.patch("/users", formData);
      localStorage.setItem("token", response.headers["authorization"]);
      getProfilePage();
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
        overflow: "none",
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
        onUserLogin={userSign}
        onUserUpdate={userUpdate}
      />
    </div>
  );
}
