import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atom";

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);

  return <div>로그인</div>;
}

export default LoginPage;
