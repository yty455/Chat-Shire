import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { loginuser, accessToken, isLogin_recoil } from "../stores/atom";
import qs from "qs";
import { postUser } from "../utils/userApi";
import axios from "axios";

function Redirect() {
  const [token, setToken] = useRecoilState(accessToken);
  const [islogin, setIslogin] = useRecoilState(isLogin_recoil);
  const navigate = useNavigate();
  // const { code } = qs.parse(window.location.search, {
  //   ignoreQueryPrefix: true,
  // });

  const { access_token } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const { refresh_token } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  // console.log(code);
  console.log(access_token);
  console.log(refresh_token);

  useEffect(() => {
    if (typeof access_token === "string") {
      localStorage.setItem("token", access_token);
    }
    if (refresh_token) {
      sessionStorage.setItem("refresh_token", refresh_token.toString());
      // 리프레쉬 토큰이 있다면 메인 페이지로 이동
      setIslogin(true);
      navigate("/main");
    } else {
      // 리프레쉬 토큰이 없다면 회원가입 페이지로 이동
      navigate("/profile/custom");
    }
  }, [access_token, refresh_token]);

  return <div>loading</div>;
}

export default Redirect;
