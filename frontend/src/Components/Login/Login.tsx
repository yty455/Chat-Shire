import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";
import styles from "./Login.module.css";
import landing2 from "./landing2.png"


function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);

  return <div className={styles.landingDiv}>
    <div className={styles.mentNBtn}>
      <p className={styles.serviceMent}>Manage your<br/>
        projects simply<br/>
        and easily.</p>
      <p className={styles.serviceMentLong}>
        Join us and manage your tasks and ideas<br/>
        throughout chattings </p>
      <button className={styles.github}>깃허브로 로그인</button>
    </div>
    <div className={styles.circleNImg}>
      <div className={styles.circle}></div>
      <img src={landing2} alt="landing1" className={styles.landing1} />
    </div>
  </div>;
}

export default LoginPage;
