import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";
import styles from "./Login.module.css";
import landing2 from "./landing2.png";
import { useNavigate } from "react-router";
import api from "../../utils/api";
import { getGit } from "../../utils/apiService";

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);
  const navigate = useNavigate();

  const handleLogin = async () => {
    gitLogin();
    navigate("/main");
  };

  const gitLogin = async () => {
    try {
      const response = await getGit();
      console.log(response);
      setUserDate(response.data);
      navigate("/main");
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
            handleLogin();
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
