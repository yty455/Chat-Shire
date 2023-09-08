import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atom";
import Login from "../Components/Login/Login"

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);

  return <div>
    <Login />
  </div>;
}

export default LoginPage;
