import React, { useState } from "react";
import axios from "axios";

function SignUpPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    profileImage: "",
    profileColor: "",
    introduction: "",
    detailIntroduction: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const usersign = async () => {
    try {
      const response = await axios.post("/api1/users", formData);
      console.log(response.headers);
      localStorage.setItem("token", response.headers.Authorization);
      // sessionStorage.setItem("refreshtoken", response.headers.Authorization-Refresh);
      // window.location.href = "http://j9e205.p.ssafy.io:8080/oauth2/sign-up";
      // navigate("/oauth2/sign-up");
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
      <input
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
      />
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
      <button onClick={usersign}>회원가입</button>
    </div>
  );
}

export default SignUpPage;
