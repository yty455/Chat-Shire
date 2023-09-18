import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";
import styles from "./Login.module.css";
import landing2 from "./landing2.png";
import { useNavigate } from "react-router";

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/main");
  };
  return (
    <div className={styles.landingDiv}>
      <div className={styles.mentNBtn}>
        <p className={styles.serviceMent}>
          프로젝트 관리를
          <br />
          쉽고 간단하게.
          {/* <br />
          and easily. */}
        </p>
        <p className={styles.serviceMentLong}>
          태스크와 아이디어를 채팅과 연결해
          <br />
          효율적으로 관리해보세요{" "}
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
