import React from "react";
import NowProject from "./NowProject";
import ComProject from "./ComProject";
import styles from "./Project.module.css";
import Container from "../common/Container";

const pjt = {
  now: [
    {
      id: 1,
      name: "공통",
      content: "공통",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 2,
      name: "특화",
      content: "특화",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 3,
      name: "관통",
      content: "관통",
      member: ["mem1", "mem2", "mem3"],
    },
  ],
  com: [
    {
      id: 1,
      name: "자율",
      content: "자율",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 2,
      name: "공통",
      content: "공통",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 3,
      name: "관통",
      content: "관통",
      member: ["mem1", "mem2", "mem3"],
    },
  ],
};

function Project() {
  return (
    <Container
      backgroundColor="white"
      text=""
      width="1170px"
      height="85vh"
      margin="60px 10px 40px 10px"
      padding=""
      borderRadius="20px"
      boxShadow="0 8px 10px 0 rgba(131, 131, 131, 0.37)"
      backdropFilter="blur(7px)"
      transition="all 0.2s ease-in-out"
      display="flex"
      justifyContent="center"
    >
      <div className={styles.projectcontainer}>
        <h2 className={styles.projecttxt}>PROJECT</h2>
        <NowProject nowpjt={pjt.now}></NowProject>
        <ComProject compjt={pjt.com}></ComProject>
      </div>
    </Container>
  );
}

export default Project;
