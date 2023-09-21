import React, { useState, useEffect } from "react";
import axios from "axios";
// import { postUser } from "../utils/userApi";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { allLanguage } from "../utils/userApi";
import { postUser } from "../utils/userApi";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    introduction: "",
    detailIntroduction: "",
    mySkill: [] as string[],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleMySkillInputChange = (e: any) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        mySkill: [...formData.mySkill, e.target.value.trim()],
      });

      // 인풋창 비우기
      e.target.value = "";
    }
  };

  useEffect(() => {
    getLan();
  }, []);

  const usersign = async () => {
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
  const getLan = async () => {
    try {
      const response = await allLanguage();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="nickname"
        value={formData.nickname}
        onChange={handleInputChange}
        placeholder="Nickname"
      />
      {/* <input
        type="text"
        name="profileImage"
        value={formData.profileImage}
        onChange={handleInputChange}
        placeholder="Profile Image"
      />
      <input
        type="text"
        name="profileColor"
        value={formData.profileColor}
        onChange={handleInputChange}
        placeholder="Profile Color"
      /> */}
      <input
        type="text"
        name="introduction"
        value={formData.introduction}
        onChange={handleInputChange}
        placeholder="Introduction"
      />
      <input
        type="text"
        name="detailIntroduction"
        value={formData.detailIntroduction}
        onChange={handleInputChange}
        placeholder="Detail Introduction"
      />
      <div>
        <input
          type="text"
          name="mySkill"
          onKeyPress={handleMySkillInputChange}
          placeholder="mySkill"
        />
        <ul>
          {formData.mySkill.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <button onClick={usersign}>회원가입</button>
    </div>
  );
}

export default SignUpPage;
