import React from "react";
import axios from "axios";

function SignUpPage() {
  const usersign = async () => {
    try {
      const response = await axios.post("/api1/users", {
        nickname: "bdc",
        profileImage: "asd",
        profileColor: "asd",
        introduction: "asd",
        detailIntroduction: "asd",
      });
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
      <button onClick={usersign}>회원가입</button>
    </div>
  );
}

export default SignUpPage;
