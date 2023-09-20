import React, { useEffect, useState } from "react";
import NowProject from "./NowProject";
import ComProject from "./ComProject";
import styles from "./Project.module.css";
import Container from "../common/Container";
import { getProjects } from "../../utils/projectApi";
import { loginuser, nowProject_recoil } from "../../stores/atom";
import { useRecoilState } from "recoil";
import ProjectModal from "./ProjectModal";

const pjt = {
  now: [
    {
      id: 1,
      name: "공통",
      description: "공통",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 2,
      name: "특화",
      description: "특화",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 3,
      name: "관통",
      description: "관통",
      member: ["mem1", "mem2", "mem3"],
    },
  ],
  com: [
    {
      id: 1,
      name: "자율",
      description: "자율",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 2,
      name: "공통",
      description: "공통",
      member: ["mem1", "mem2", "mem3"],
    },
    {
      id: 3,
      name: "관통",
      description: "관통",
      member: ["mem1", "mem2", "mem3"],
    },
  ],
};

function Project() {
  const [userDate, setUserDate] = useRecoilState(loginuser);
  const [nowProject, setNowProject] = useRecoilState(nowProject_recoil);

  const [allPjt, setAllPjt] = useState([]);
  const [nowPjt, setNowPjt] = useState<any[]>([]);
  const [comPjt, setComPjt] = useState<any[]>([]);
  const today = new Date();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleProjectCardClick = (pjt: any) => {
    setSelectedProject(pjt);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getMyProjects = async () => {
    try {
      const response = await getProjects();
      console.log(response.data.result[0], 123);
      const projects = response.data.result[0];
      setAllPjt(response.data.result[0]);

      const nowProjects: any[] = [];
      const completedProjects: any[] = [];

      for (const pjt of projects) {
        if (new Date(pjt.endDate) < today) {
          console.log(pjt, 2);
          completedProjects.push(pjt);
        } else {
          console.log(pjt, 1);
          nowProjects.push(pjt);
        }
        console.log(pjt.endDate);
      }
      console.log(nowProjects);
      console.log(completedProjects);

      setComPjt(completedProjects);
      setNowProject(nowProjects);
      console.log(nowProject);
      console.log(comPjt);
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
        <NowProject
          nowpjt={nowProject || pjt.now}
          onProjectCardClick={handleProjectCardClick}
        ></NowProject>
        <ComProject
          compjt={pjt.com}
          onProjectCardClick={handleProjectCardClick}
        ></ComProject>
      </div>
      {openModal && (
        <ProjectModal pjt={selectedProject} closeModal={handleCloseModal} />
      )}
    </Container>
  );
}

export default Project;
