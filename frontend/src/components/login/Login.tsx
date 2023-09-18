import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";
import styles from "./Login.module.css";
import landing2 from "./landing2.png";
import { useNavigate } from "react-router";
import { getGit, postUser } from "../../utils/apiService";
import api from "../../utils/api";
import axios from "axios";

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);
  const navigate = useNavigate();
  const url = `https://github.com/login/oauth/authorize?client_id=e5f1721b3eecc64f3c29&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/callback`;
  const onClick = () => {
    // window.location.href = "http://j9e205.p.ssafy.io:8080/login";
    window.location.href = url;
    // usersign();
    // gitSign();
    // redirectToGithub();
    // navigate("/main");
  };

  // const redirectToGithub = () => {
  // window.location.href = "http://j9e205.p.ssafy.io:8080/oauth2/sign-up";
  // };
  // const gitSign = async () => {
  //   try {
  //     const response = await getGit();
  //     console.log(response);
  //     // window.location.href = "http://j9e205.p.ssafy.io:8080/oauth2/sign-up";
  //     // navigate("/oauth2/sign-up");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const usersign = async () => {
    try {
      const response = await axios.post("abc", "ddd");
      console.log(response);
      // window.location.href = "http://j9e205.p.ssafy.io:8080/oauth2/sign-up";
      // navigate("/oauth2/sign-up");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.landingDiv}>
      <div className={styles.mentNBtn}>
        <p className={styles.serviceMent}>
          Manage your
          <br />
          projects simply
          <br />
          and easily.
        </p>
        <p className={styles.serviceMentLong}>
          Join us and manage your tasks and ideas
          <br />
          throughout chattings{" "}
        </p>
        <button
          className={styles.github}
          onClick={() => {
            onClick();
          }}
        >
          깃허브로 로그인
        </button>
      </div>
      <div className={styles.circleNImg}>
        <div className={styles.circle}></div>
        <img src={landing2} alt="landing1" className={styles.landing1} />
      </div>
    </div>
  );
}

export default LoginPage;
