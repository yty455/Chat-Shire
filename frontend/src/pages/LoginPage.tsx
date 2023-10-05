import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atom";
import Login from "../components/login/Login";

function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
