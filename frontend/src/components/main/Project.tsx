import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { getProjects } from "../../utils/projectApi";
import { loginuser, nowProject_recoil } from "../../stores/atom";
import { useRecoilState } from "recoil";
import ProjectModal from "./ProjectModal";
import { outProject } from "../../utils/projectApi";
import { updateProject } from "../../utils/projectApi";
import { Avatar } from "@mui/material";
import Keywords from "../analysis/Keywords";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

import styles from "./Project.module.css";

import { BiSolidTime } from 'react-icons/bi'

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
  const [userData, setUserData] = useRecoilState(loginuser);
  const [myProjects, setMyProjects] = useState([]);

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
      setMyProjects(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyProjects();
  }, []);

  const deleteProject = async (projectId: any) => {
    try {
      const response = await outProject(projectId);
      console.log(response);
      getMyProjects();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updatePJT = async (pjtdata: any) => {
    try {
      const response = await updateProject(
        pjtdata.id,
        pjtdata.name,
        pjtdata.teamName,
        pjtdata.topic,
        pjtdata.description,
        pjtdata.gitRepository,
        pjtdata.startDate,
        pjtdata.endDate
      );
      console.log(response.data.result);
      getMyProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      fontSize=""
      backgroundColor="white"
      text=""
      width="54vw"
      height="81vh"
      margin=""
      padding="2vh 2vw"
      border="1px solid #E5E8EB"
      borderRadius="20px"
      boxShadow=""
      backdropFilter=""
      transition=""
      display="flex"
      justifyContent="center"
    >
      <div className={styles.projectContainer}>
        <span className={styles.projectTitle}>CSI님의 프로젝트에요</span>
        <div style={{position: "relative"}}>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={30}
            // centeredSlides={true}
            grabCursor={true}
            className={styles.SwiperContainer}
          >
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.SwiperItem}>
            <div className={styles.SwiperItemHeader}>
              <div className={styles.ProjectDateContainer}>
                <BiSolidTime size={20} color="#575757"/>
                <span style={{fontFamily: "preRg", color: "#575757"}}>6d 14h</span>
              </div>
              <div className={styles.ProjectTitleContainer}>
                <div style={{borderRadius: "30px", width: "20px", height: "20px", backgroundColor: "yellow", marginRight: "4px"}}></div>
                <span className={styles.SwiperItemTitle}>CHAT-SHIRE | 오잉</span>
              </div>
            </div>
            <div className={styles.SwiperItemBody}>
              <div className={styles.ProjectDescContainer}>
                <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
              </div>
              <div className={styles.ProjectTopicConatiner}>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
                <Keywords/>
              </div>
              <div className={styles.ProjectMemberContainer}>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
                <Avatar alt="Remy Sharp" src={userData.profileImage != null ? process.env.PUBLIC_URL + userData.profileImage : process.env.PUBLIC_URL + "/assets/profile/m57.png"} sx={{ width: 60, height: 60, bgcolor: "gray", marginRight: "10px" }}/>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      </div>
      {openModal && (
        <ProjectModal
          pjt={selectedProject}
          closeModal={handleCloseModal}
          deleteProject={(projectId: any) => deleteProject(projectId)}
          updatePJT={(pjtdata: any) => updatePJT(pjtdata)}
        />
      )}
    </Container>
  );
}

export default Project;
