import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginuser, accessToken } from "../stores/atom";
import qs from "qs";
import { postUser } from "../utils/apiService";

function Redirect() {
  const [token, setToken] = useRecoilState(accessToken);
  const { code } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(code);
  useEffect(() => {
    const usersign = async () => {
      try {
        const response = await postUser("abc", "ddd");
        console.log(response);
        // window.location.href = "http://j9e205.p.ssafy.io:8080/oauth2/sign-up";
        // navigate("/oauth2/sign-up");
      } catch (error) {
        console.error(error);
      }
    };

    // const login = async () => {
    //   try {
    //     const response = await fetch(`url?code=${code}`);
    //     const data = await response.json();

    //     localStorage.setItem("token", data.jwt);
    //     localStorage.setItem("ProfileURL", data.avatar_url);
    //   } catch (error) {}
    // };

    // getToken();
    // try {
    //   const response = await  fetch.()

    // }
  }, []);

  return <div>code-callback</div>;
}

export default Redirect;
