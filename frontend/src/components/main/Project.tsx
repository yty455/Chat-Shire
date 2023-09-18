import React, { useEffect, useState } from "react";
import NowProject from "./NowProject";
import ComProject from "./ComProject";
import styles from "./Project.module.css";
import Container from "../common/Container";
import { getProjects } from "../../utils/apiService";
import { loginuser } from "../../stores/atom";
import { useRecoilState } from "recoil";

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
  const [userDate, setUserDate] = useRecoilState(loginuser);
  const [allPjt, setAllPjt] = useState([]);
  const [nowPjt, setNowPjt] = useState<any[]>([]);
  const [comPjt, setComPjt] = useState<any[]>([]);
  const today = new Date();

  const getMyProjects = async () => {
    try {
      const response = await getProjects();
      console.log(response.data.result[0], 123);
      setAllPjt(response.data.result);
      response.data.result[0].forEach((pjt: any) => {
        // if (pjt.endDate < today) {

        // } else {

        // }
        console.log(pjt.endDate);
        // console.log(nowPjt);
        // console.log(comPjt);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyProjects();
  }, []);

  return (
    <Container
      fontSize=""
      backgroundColor="white"
      text=""
      width="58vw"
      height="85vh"
      margin=""
      padding=""
      border="1px solid #E5E8EB"
      borderRadius="20px"
      boxShadow=""
      backdropFilter=""
      transition=""
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
