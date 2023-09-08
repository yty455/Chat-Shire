import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";
import styles from "./Login.module.css";
import landing1 from "./landing1.png"

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);

  return <div className={styles.landingDiv}>
    <div>
      <p className={styles.serviceMent}>Manage your<br/>
projects simply<br/>
and easily.</p>
      <p className={styles.serviceMentLong}>
Join us and manage your tasks and ideas<br/>
throughout chattings </p>
    </div>
    <img src={landing1} alt="landing1" className={styles.landing1} />
  </div>;
}

export default LoginPage;
