import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginuser, accessToken } from "../stores/atom";

function Redirect() {
  const [token, setToken] = useRecoilState(accessToken);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const isUser = urlParams.get("is_user");

    if (accessToken === null) {
      // accessToken이 null인 경우의 처리 로직
      console.error("No access token found");
    } else {
      console.log(accessToken);
      console.log(isUser);
      setToken(accessToken);
    }
  }, []);

  return <div></div>;
}

export default Redirect;
