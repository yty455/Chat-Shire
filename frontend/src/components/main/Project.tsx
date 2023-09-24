import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { getProjects } from "../../utils/projectApi";
import { loginuser, nowProject_recoil } from "../../stores/atom";
import { useRecoilState } from "recoil";
import ProjectModal from "./ProjectModal";
import { outProject } from "../../utils/projectApi";
import { updateProject } from "../../utils/projectApi";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import Keywords from "../analysis/Keywords";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./Project.module.css";

import { BsFillCalendarFill } from "react-icons/bs";
import { FaExpand } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const [nowProject, setNowProject] = useRecoilState(nowProject_recoil);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const today = new Date();
  const navigate = useNavigate();

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
      setMyProjects(response.data.result[0]);

      const nowProjects: any[] = [];

      for (const pjt of projects) {
        if (new Date(pjt.endDate) < today) {
        } else {
          nowProjects.push(pjt);
        }
      }
      setNowProject(nowProjects);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToProject = () => {
    navigate("/message/1");
  };

  useEffect(() => {
    getMyProjects();
  }, []);

  const createProject = () => {
    navigate("/createpjt");
  };

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
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            centeredSlides={true}
            grabCursor={true}
            className={styles.SwiperContainer}
          >
            <SwiperSlide
              className={styles.SwiperItem}
              onClick={handleProjectCardClick}
            >
              {({ isActive }) => (
                <div className={isActive ? styles.active : styles.Inactive}>
                  <div
                    className={
                      isActive
                        ? styles.SwiperItemHeader
                        : styles.SwiperItemHeaderInactive
                    }
                  >
                    <div className={styles.ProjectTitleContainer}>
                      <span className={styles.SwiperItemTitle}>
                        PJT CHAT-SHIRE : 오잉
                      </span>
                    </div>
                    <div className={styles.ProjectDateContainer}>
                      <BsFillCalendarFill size={16} color="#575757" />
                      <span
                        style={{
                          fontFamily: "preRg",
                          color: "#575757",
                          marginLeft: "4px",
                          letterSpacing: "1px",
                        }}
                      >
                        SEP.04~OCT.17
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      isActive
                        ? styles.SwiperItemBody
                        : styles.SwiperItemBodyInactive
                    }
                  >
                    <div
                      style={{ marginTop: "4px", marginLeft: "4px" }}
                      className={
                        isActive
                          ? styles.ProjectDescContainer
                          : styles.ProjectDescContainerInactive
                      }
                    >
                      <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
                    </div>
                    <div
                      className={
                        isActive
                          ? styles.ProjectTopicConatiner
                          : styles.ProjectTopicContainerInactive
                      }
                    >
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                    </div>
                    <div className={styles.ProjectMemberContainer}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide
              className={styles.SwiperItem}
              onClick={handleProjectCardClick}
            >
              {({ isActive }) => (
                <div className={isActive ? styles.active : styles.Inactive}>
                  <div
                    className={
                      isActive
                        ? styles.SwiperItemHeader
                        : styles.SwiperItemHeaderInactive
                    }
                  >
                    <div className={styles.ProjectTitleContainer}>
                      <span className={styles.SwiperItemTitle}>
                        PJT CHAT-SHIRE : 오잉
                      </span>
                    </div>
                    <div className={styles.ProjectDateContainer}>
                      <BsFillCalendarFill size={16} color="#575757" />
                      <span
                        style={{
                          fontFamily: "preRg",
                          color: "#575757",
                          marginLeft: "4px",
                          letterSpacing: "1px",
                        }}
                      >
                        SEP.04~OCT.17
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      isActive
                        ? styles.SwiperItemBody
                        : styles.SwiperItemBodyInactive
                    }
                  >
                    <div
                      style={{ marginTop: "4px", marginLeft: "4px" }}
                      className={
                        isActive
                          ? styles.ProjectDescContainer
                          : styles.ProjectDescContainerInactive
                      }
                    >
                      <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
                    </div>
                    <div
                      className={
                        isActive
                          ? styles.ProjectTopicConatiner
                          : styles.ProjectTopicContainerInactive
                      }
                    >
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                    </div>
                    <div className={styles.ProjectMemberContainer}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide
              className={styles.SwiperItem}
              onClick={handleProjectCardClick}
            >
              {({ isActive }) => (
                <div className={isActive ? styles.active : styles.Inactive}>
                  <div
                    className={
                      isActive
                        ? styles.SwiperItemHeader
                        : styles.SwiperItemHeaderInactive
                    }
                  >
                    <div className={styles.ProjectTitleContainer}>
                      <span className={styles.SwiperItemTitle}>
                        PJT CHAT-SHIRE : 오잉
                      </span>
                    </div>
                    <div className={styles.ProjectDateContainer}>
                      <BsFillCalendarFill size={16} color="#575757" />
                      <span
                        style={{
                          fontFamily: "preRg",
                          color: "#575757",
                          marginLeft: "4px",
                          letterSpacing: "1px",
                        }}
                      >
                        SEP.04~OCT.17
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      isActive
                        ? styles.SwiperItemBody
                        : styles.SwiperItemBodyInactive
                    }
                  >
                    <div
                      style={{ marginTop: "4px", marginLeft: "4px" }}
                      className={
                        isActive
                          ? styles.ProjectDescContainer
                          : styles.ProjectDescContainerInactive
                      }
                    >
                      <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
                    </div>
                    <div
                      className={
                        isActive
                          ? styles.ProjectTopicConatiner
                          : styles.ProjectTopicContainerInactive
                      }
                    >
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                    </div>
                    <div className={styles.ProjectMemberContainer}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide
              className={styles.SwiperItem}
              onClick={handleProjectCardClick}
            >
              {({ isActive }) => (
                <div className={isActive ? styles.active : styles.Inactive}>
                  <div
                    className={
                      isActive
                        ? styles.SwiperItemHeader
                        : styles.SwiperItemHeaderInactive
                    }
                  >
                    <div className={styles.ProjectTitleContainer}>
                      <span className={styles.SwiperItemTitle}>
                        PJT CHAT-SHIRE : 오잉
                      </span>
                    </div>
                    <div className={styles.ProjectDateContainer}>
                      <BsFillCalendarFill size={16} color="#575757" />
                      <span
                        style={{
                          fontFamily: "preRg",
                          color: "#575757",
                          marginLeft: "4px",
                          letterSpacing: "1px",
                        }}
                      >
                        SEP.04~OCT.17
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      isActive
                        ? styles.SwiperItemBody
                        : styles.SwiperItemBodyInactive
                    }
                  >
                    <div
                      style={{ marginTop: "4px", marginLeft: "4px" }}
                      className={
                        isActive
                          ? styles.ProjectDescContainer
                          : styles.ProjectDescContainerInactive
                      }
                    >
                      <span>우리들의 프로젝트 쿠쿠루핑퐁</span>
                    </div>
                    <div
                      className={
                        isActive
                          ? styles.ProjectTopicConatiner
                          : styles.ProjectTopicContainerInactive
                      }
                    >
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                      <Keywords />
                    </div>
                    <div className={styles.ProjectMemberContainer}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          userData.profileImage != null
                            ? process.env.PUBLIC_URL + userData.profileImage
                            : process.env.PUBLIC_URL + "/assets/profile/m57.png"
                        }
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: "gray",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
            <SwiperSlide className={styles.SwiperItem} onClick={createProject}>
              <div className={styles.CreateProjectContainer}>
                <span style={{ fontSize: "20px", fontFamily: "preBd" }}>
                  새 프로젝트 생성하기
                </span>
                <Fab
                  style={{ zIndex: 2 }}
                  sx={{
                    mb: "20px",
                    mt: "20px",
                    mr: "auto",
                    ml: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  color="greenary"
                  aria-label="add"
                >
                  <AddIcon sx={{ width: "34px", height: "34px" }} />
                </Fab>
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
