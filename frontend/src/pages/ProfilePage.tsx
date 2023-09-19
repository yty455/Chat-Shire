import React from "react";
import styles from "./ProfilePage.module.css";
import ProfileLarge from "../components/profile/ProfileLarge";
import { useNavigate, useLocation } from "react-router-dom";

import RadarChart from "../components/analysis/RadarChart";
import BarChart from "../components/analysis/BarChart";
import LeftSide from "../components/common/LeftSide";

import { BsGithub, BsCodeSlash, BsPersonFill } from "react-icons/bs";
import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoHtml5,
  BiLogoPython,
  BiLogoReact,
  BiLogoVuejs,
  BiLogoDjango,
  BiLogoCss3,
  BiLogoFlutter,
  BiLogoGit,
} from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const achievements = [
]



function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const bronze = process.env.PUBLIC_URL + '/assets/achievements/bronze.png'
  const silver = process.env.PUBLIC_URL + '/assets/achievements/silver.png'
  const gold = process.env.PUBLIC_URL + '/assets/achievements/gold.png'

  function profileSetting() {
    navigate("/profile/setting");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F7F7F7",
      }}
    >
      <LeftSide />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2vh 2vw",
          width: "75vw",
          height: "81vh",
          borderRadius: "20px",
          border: "1px solid #E5E8EB",
          backgroundColor: "#ffffff",
        }}
      >
        <div className={styles.profileHeader}>
          <ProfileLarge />
          <div className={styles.profileHeaderDesc}>
            <div className={styles.profileHeaderLeft}>
              <span className={styles.profileName}>김구현 FE</span>
              <div className={styles.profileCareer}>
                <div className={styles.profileCareerItem}>
                  <BsGithub size={30} style={{ marginRight: "8px" }} />
                  <span>ggu123@gmail.com</span>
                </div>
                <div className={styles.profileCareerItem}>
                  <BsCodeSlash size={30} style={{ marginRight: "8px" }} />
                  <BiLogoTypescript size={26} />
                  <BiLogoJavascript size={26} />
                  <BiLogoHtml5 size={26} />
                  <BiLogoPython size={26} />
                  <BiLogoReact size={26} />
                  <BiLogoVuejs size={26} />
                  <BiLogoDjango size={26} />
                  <BiLogoFlutter size={26} />
                  <BiLogoGit size={26} />
                  <BiLogoCss3 size={26} />
                </div>
                <div className={styles.profileCareerItem}>
                  <BsPersonFill size={30} style={{ marginRight: "8px" }} />
                  <span>장관상수상, 슈퍼개발자</span>
                </div>
              </div>
              <div className={styles.profileIntroduce}>
                <span>안녕하세요 제 이름은 김구현이고 어쩌고 저쩌고</span>
              </div>
              <div className={styles.profileTag}>
                <span>#하하 #헤헤 #히히 #호호</span>
              </div>
            </div>
            <div className={styles.profileHeaderRight}>
              <div className={styles.profileRadarContainer}>
                <RadarChart />
              </div>
              <div className={styles.profileBarContainer}>
                <BarChart />
              </div>
            </div>
            <IoMdSettings
              className={styles.profileSettingButton}
              color="#575757"
              size={30}
              onClick={profileSetting}
            />
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.profileBodyTitle}>
            <span style={{ color: "#575757", fontSize: "34px" }}>
              Achievement{" "}
            </span>
            <span style={{ color: "#575757", fontSize: "20px" }}>5/48</span>
          </div>
          <div className={styles.progressBar}>
            <Box sx={{ width: "400px" }}>
              <LinearProgressWithLabel value={10} />
            </Box>
          </div>
          <div className={styles.AchievementContainer}>
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={bronze}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={silver}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
            <img
              width="78px"
              height="78px"
              style={{ margin: "0px 14px 14px 0px" }}
              src={gold}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
