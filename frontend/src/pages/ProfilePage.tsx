import React from "react";
import styles from "./ProfilePage.module.css";
import ProfileLarge from "../components/profile/ProfileLarge";
import LeftSideTab from "../components/common/LeftSideTab";
import RadarChart from "../components/analysis/RadarChart";
import BarChart from "../components/analysis/BarChart";
import Achievement from "../components/profile/Achievement";
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

import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
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
          width: "1080px",
          height: "630px",
          padding: "30px",
          borderRadius: "36px",
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
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
            <Achievement />
          </div>
        </div>
      </div>
    </div>
  );
}
