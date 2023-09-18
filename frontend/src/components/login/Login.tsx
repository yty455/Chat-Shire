import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";
import styles from "./Login.module.css";
import landing2 from "./landing2.png";
import { useNavigate } from "react-router";
import { getGit } from "../../utils/apiService";

function LoginPage() {
  const [userData, setUserDate] = useRecoilState(loginuser);
  const navigate = useNavigate();

  const onClick = () => {
    window.location.href = "http://j9e205.p.ssafy.io:8080/login";
    // gitSign();
    // redirectToGithub();
    // navigate("/main");
  };

  // const redirectToGithub = () => {
  // window.location.href = "http://j9e205.p.ssafy.io:8080/oauth2/sign-up";
  // };
  const gitSign = async () => {
    try {
      const response = await getGit();
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
          프로젝트 관리를
          <br />
          쉽고 간단하게.
          {/* <br />
          and easily. */}
        </p>
        <p className={styles.serviceMentLong}>
          대화에서 파생된 아이디어와 태스크를 실시간으로 기록하고 관리하세요.
          <br />
          간편함과 효율성 사이에서 고민하지 마세요, 두 가지 모두를 경험하세요.
        </p>
        {/* <p className={styles.serviceMentLong}>
          태스크와 아이디어를 채팅과 연결해
          <br />
          효율적으로 관리해보세요{" "}
        </p> */}
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
