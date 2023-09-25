import React, { useEffect, useState } from "react";
import { getProjects } from "../../utils/projectApi";
import { loginuser, nowProject_recoil } from "../../stores/atom";
import { useRecoilState } from "recoil";
import { Avatar } from "@mui/material";
import Keywords from "../analysis/Keywords";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./Project.module.css";
import { BsFillCalendarFill } from "react-icons/bs";
import { getProjectMem } from "../../utils/projectApi";

interface ProjectSlideProps {
  pjt?: any;
  onCardClick?: () => void;
  isActive?: any;
}

function ProjectSlide({ pjt, onCardClick, isActive }: ProjectSlideProps) {
  const [userData, setUserData] = useRecoilState(loginuser);
  const [pjtMem, setpjtMem] = useState([]);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onCardClick?.();
  };

  const getProjectUsers = async () => {
    try {
      const response = await getProjectMem(pjt.id);
      console.log(response.data.result[0]);
      setpjtMem(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectUsers();
  }, []);

  return (
    <div
      className={isActive ? styles.active : styles.Inactive}
      onClick={handleModalClick}
    >
      <div
        className={
          isActive ? styles.SwiperItemHeader : styles.SwiperItemHeaderInactive
        }
      >
        <div className={styles.ProjectTitleContainer}>
          <span className={styles.SwiperItemTitle}>{pjt.name}</span>
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
            {`${pjt.startDate}~${pjt.endDate}`}
          </span>
        </div>
      </div>

      <div
        className={
          isActive ? styles.SwiperItemBody : styles.SwiperItemBodyInactive
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
          <span>{pjt.description}</span>
        </div>
        <div
          className={
            isActive
              ? styles.ProjectTopicConatiner
              : styles.ProjectTopicContainerInactive
          }
        >
          <Keywords topic={pjt.topic} />
          {/* <Keywords topic={pjt.topic} />
          <Keywords topic={pjt.topic} />
          <Keywords topic={pjt.topic} />
          <Keywords topic={pjt.topic} /> */}
        </div>
      </div>
      <div
        className={
          isActive
            ? styles.ProjectMemberContainer
            : styles.ProjectMemberContainerInactive
        }
      >
        {pjtMem.map((user: any) => (
          <Avatar
            alt="Remy Sharp"
            src={
              user.profileImage != null
                ? process.env.PUBLIC_URL + user.profileImage
                : process.env.PUBLIC_URL + "/assets/profile/m57.png"
            }
            sx={{
              width: 60,
              height: 60,
              bgcolor: user.profileColor,
              marginRight: "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectSlide;
