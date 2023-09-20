import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { loginuser, accessToken } from "../stores/atom";
import qs from "qs";
import { postUser } from "../utils/userApi";
import axios from "axios";

function Redirect() {
  const [token, setToken] = useRecoilState(accessToken);
  const navigate = useNavigate();
  // const { code } = qs.parse(window.location.search, {
  //   ignoreQueryPrefix: true,
  // });

  const { access_token } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const { refreshToken } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  // console.log(code);
  console.log(access_token);
  console.log(refreshToken);

  useEffect(() => {
    if (typeof access_token === "string") {
      localStorage.setItem("token", access_token);
    }
    if (refreshToken) {
      // 리프레쉬 토큰이 있다면 메인 페이지로 이동
      navigate("/main");
    } else {
      // 리프레쉬 토큰이 없다면 회원가입 페이지로 이동
      navigate("/signup");
    }
  }, [access_token, refreshToken]);

  // const login = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://j9e205.p.ssafy.io:8080/login/oauth2/code/github?code=${code}&state=yKSSNKuZSnFiyHgnCT_Jcw741bdp-vutjnQgH9XLRL0%3D`
  //     );
  //     // const data = await response.json();
  //     console.log(response);
  //     // console.log(data);

  //     localStorage.setItem("token", token);
  //   } catch (error) {}
  // };

  // getToken();
  // try {
  //   const response = await  fetch.()

  // }

  // useEffect(() => {
  //   if (typeof access_token === "string") {
  //     localStorage.setItem("token", access_token);
  //   }
  //   // usersign();
  //   // login();
  // }, [access_token]);

  return <div>code-callback</div>;
}

export default Redirect;
