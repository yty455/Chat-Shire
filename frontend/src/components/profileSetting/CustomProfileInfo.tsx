import React, { useEffect, useState } from "react";
import styles from "./CustomProfileInfo.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import MultiSelect from "../error/MultiSelect";
import { useRecoilState } from "recoil";
import { loginuser, isLogin_recoil } from "../../stores/atom";

interface CustomProfileProps {
  onUpdatenickname: any;
  onUpdateintroduction: any;
  onUpdatedetailIntroduction: any;
  onUpdatemySkill: any;
  onUpdateposition: any;
  onUserLogin: () => void;
  onUserUpdate: () => void;
}

export default function CustomProfileInfo({
  onUpdatenickname,
  onUpdateintroduction,
  onUpdatedetailIntroduction,
  onUpdateposition,
  onUpdatemySkill,
  onUserLogin,
  onUserUpdate,
}: CustomProfileProps) {
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [detailIntroduction, setDetailIntroduction] = useState("");
  const [userData, setUserData] = useRecoilState(loginuser);
  const [isLogin, setIsLogin] = useRecoilState(isLogin_recoil);
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const selectSkill = (e: any) => {
    if (selectedId && selectedId.includes(String(e.target.id))) {
      const newSelectedId = selectedId.filter((item) => item != e.target.id);
      setSelectedId(newSelectedId);
      onUpdatemySkill(newSelectedId);
    } else {
      const newSelectedId = [...selectedId, String(e.target.id)];
      setSelectedId(newSelectedId);
      onUpdatemySkill(newSelectedId);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickname") {
      setNickname(value);
      onUpdatenickname(value);
    } else if (name === "introduction") {
      setIntroduction(value);
      onUpdateintroduction(value);
    } else if (name === "detailIntroduction") {
      setDetailIntroduction(value);
      onUpdatedetailIntroduction(value);
    } else if (name === "position") {
      setPosition(value);
      onUpdateposition(value);
    }
  };

  useEffect(() => {
    if (isLogin) {
      setNickname(userData.nickname);
      setPosition(userData.position);
      setIntroduction(userData.introduction);
      setDetailIntroduction(userData.detailIntroduction);
      setSelectedId(userData.mySkill);
      console.log(nickname);
      console.log(position);
    }
    console.log(introduction);
    console.log(position);
  }, []);

  return (
    <div className={styles.ProfileInfoContainer}>
      <div className={styles.ProfileInfoHeader}>
        <span className={styles.AvatarCustomTitle}>내 정보</span>
      </div>
      <div className={styles.ProfileInfoBody}>
        <TextField
          fullWidth
          name="nickname"
          color="greenary"
          margin="dense"
          required
          id="nickname"
          label="어떻게 부르면 될까요?"
          // defaultValue={nickname}
          value={nickname}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <span style={{ margin: "8px 0px -4px 0px", fontFamily: "preLt" }}>
          뭐할줄 알아여
        </span>
        <div className={styles.ProfileInfoSkillSelector}>
          <img
            id="java"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("java")
                ? `https://img.shields.io/badge/java-437291?style=for-the-badge&logo=openjdk&logoColor=white`
                : `https://img.shields.io/badge/java-757575?style=for-the-badge&logo=openjdk&logoColor=white`
            }
          />
          <img
            id="python"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("python")
                ? `https://img.shields.io/badge/python-3777AB?style=for-the-badge&logo=python&logoColor=white`
                : `https://img.shields.io/badge/python-757575?style=for-the-badge&logo=python&logoColor=white`
            }
          />
          <img
            id="javascript"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("javascript")
                ? `https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white`
                : `https://img.shields.io/badge/javascript-757575?style=for-the-badge&logo=javascript&logoColor=white`
            }
          />
          <img
            id="html5"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("html5")
                ? `https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white`
                : `https://img.shields.io/badge/html5-757575?style=for-the-badge&logo=html5&logoColor=white`
            }
          />
          <img
            id="css3"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("css3")
                ? `https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white`
                : `https://img.shields.io/badge/css3-757575?style=for-the-badge&logo=css3&logoColor=white`
            }
          />
          <img
            id="c"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("c")
                ? `https://img.shields.io/badge/c-A8B9CC?style=for-the-badge&logo=c&logoColor=white`
                : `https://img.shields.io/badge/c-757575?style=for-the-badge&logo=c&logoColor=white`
            }
          />
          <img
            id="c++"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId?.includes("c++")
                ? `https://img.shields.io/badge/c++-A8B9CC?style=for-the-badge&logo=c%2B%2B&&logoColor=white`
                : `https://img.shields.io/badge/c++-757575?style=for-the-badge&logo=c%2B%2B&&logoColor=white`
            }
          />
          <img
            id="r"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("r")
                ? `https://img.shields.io/badge/r-276DC3?style=for-the-badge&logo=r&logoColor=white`
                : `https://img.shields.io/badge/r-757575?style=for-the-badge&logo=r&logoColor=white`
            }
          />
          <img
            id="flutter"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("flutter")
                ? `https://img.shields.io/badge/flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white`
                : `https://img.shields.io/badge/flutter-757575?style=for-the-badge&logo=flutter&logoColor=white`
            }
          />
          <img
            id="dart"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("dart")
                ? `https://img.shields.io/badge/dart-0175C2?style=for-the-badge&logo=dart&logoColor=white`
                : `https://img.shields.io/badge/dart-757575?style=for-the-badge&logo=dart&logoColor=white`
            }
          />
          <img
            id="kotlin"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("kotlin")
                ? `https://img.shields.io/badge/kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white`
                : `https://img.shields.io/badge/kotlin-757575?style=for-the-badge&logo=kotlin&logoColor=white`
            }
          />
          <img
            id="pwa"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("pwa")
                ? `https://img.shields.io/badge/pwa-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white`
                : `https://img.shields.io/badge/pwa-757575?style=for-the-badge&logo=pwa&logoColor=white`
            }
          />
          <img
            id="php"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("php")
                ? `https://img.shields.io/badge/php-777BB4?style=for-the-badge&logo=php&logoColor=white`
                : `https://img.shields.io/badge/php-757575?style=for-the-badge&logo=php&logoColor=white`
            }
          />
          <img
            id="django"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("django")
                ? `https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white`
                : `https://img.shields.io/badge/django-757575?style=for-the-badge&logo=django&logoColor=white`
            }
          />
          <img
            id="spring"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("spring")
                ? `https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white`
                : `https://img.shields.io/badge/spring-757575?style=for-the-badge&logo=spring&logoColor=white`
            }
          />
          <img
            id="vue"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("vue")
                ? `https://img.shields.io/badge/vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white`
                : `https://img.shields.io/badge/vue-757575?style=for-the-badge&logo=vue.js&logoColor=white`
            }
          />
          <img
            id="react"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("react")
                ? `https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white`
                : `https://img.shields.io/badge/react-757575?style=for-the-badge&logo=react&logoColor=white`
            }
          />
          <img
            id="next"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("next")
                ? `https://img.shields.io/badge/next-000000?style=for-the-badge&logo=next.js&logoColor=white`
                : `https://img.shields.io/badge/next-757575?style=for-the-badge&logo=next.js&logoColor=white`
            }
          />
          <img
            id="node"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("node")
                ? `https://img.shields.io/badge/node-339933?style=for-the-badge&logo=node.js&logoColor=white`
                : `https://img.shields.io/badge/node-757575?style=for-the-badge&logo=node.js&logoColor=white`
            }
          />
          <img
            id="angular"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("angular")
                ? `https://img.shields.io/badge/angular-DD0031?style=for-the-badge&logo=angular&logoColor=white`
                : `https://img.shields.io/badge/angular-757575?style=for-the-badge&logo=angular&logoColor=white`
            }
          />
          <img
            id="jenkins"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("jenkins")
                ? `https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white`
                : `https://img.shields.io/badge/jenkins-757575?style=for-the-badge&logo=jenkins&logoColor=white`
            }
          />
          <img
            id="docker"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("docker")
                ? `https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white`
                : `https://img.shields.io/badge/docker-757575?style=for-the-badge&logo=docker&logoColor=white`
            }
          />
          <img
            id="aws"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("aws")
                ? `https://img.shields.io/badge/aws-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white`
                : `https://img.shields.io/badge/aws-757575?style=for-the-badge&logo=amazonaws&logoColor=white`
            }
          />
          <img
            id="kubernetes"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("kubernetes")
                ? `https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white`
                : `https://img.shields.io/badge/kubernetes-757575?style=for-the-badge&logo=kubernetes&logoColor=white`
            }
          />
          <img
            id="three"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("three")
                ? `https://img.shields.io/badge/three-000000?style=for-the-badge&logo=three.js&logoColor=white`
                : `https://img.shields.io/badge/three-757575?style=for-the-badge&logo=three.js&logoColor=white`
            }
          />
          <img
            id="aframe"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("aframe")
                ? `https://img.shields.io/badge/aframe-EF2D5E?style=for-the-badge&logo=a-frame&logoColor=white`
                : `https://img.shields.io/badge/aframe-757575?style=for-the-badge&logo=a-frame&logoColor=white`
            }
          />
          <img
            id="unity"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("unity")
                ? `https://img.shields.io/badge/unity-000000?style=for-the-badge&logo=unity&logoColor=white`
                : `https://img.shields.io/badge/unity-757575?style=for-the-badge&logo=unity&logoColor=white`
            }
          />
          <img
            id="unreal"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("unreal")
                ? `https://img.shields.io/badge/unreal-0E1128?style=for-the-badge&logo=unrealengine&logoColor=white`
                : `https://img.shields.io/badge/unreal-757575?style=for-the-badge&logo=unrealengine&logoColor=white`
            }
          />
          <img
            id="tomcat"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("tomcat")
                ? `https://img.shields.io/badge/tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white`
                : `https://img.shields.io/badge/tomcat-757575?style=for-the-badge&logo=apachetomcat&logoColor=white`
            }
          />
          <img
            id="spark"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("spark")
                ? `https://img.shields.io/badge/spark-E25A1C?style=for-the-badge&logo=apachespark&logoColor=white`
                : `https://img.shields.io/badge/spark-757575?style=for-the-badge&logo=apachespark&logoColor=white`
            }
          />
          <img
            id="hadoop"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("hadoop")
                ? `https://img.shields.io/badge/hadoop-66CCFF?style=for-the-badge&logo=apachehadoop&logoColor=white`
                : `https://img.shields.io/badge/hadoop-757575?style=for-the-badge&logo=apachehadoop&logoColor=white`
            }
          />
          <img
            id="git"
            onClick={selectSkill}
            className={styles.ProfileSkillIcon}
            src={
              selectedId.includes("git")
                ? `https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white`
                : `https://img.shields.io/badge/git-757575?style=for-the-badge&logo=git&logoColor=white`
            }
          />
        </div>
        <TextField
          fullWidth
          name="position"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="어떤 포지션을 맡고 계신가요?"
          // defaultValue={position}
          value={position}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <TextField
          value={introduction}
          fullWidth
          name="introduction"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="나를 자랑 해주세요"
          // defaultValue={introduction}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <TextField
          fullWidth
          name="detailIntroduction"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="간단한 소개 부탁드려요"
          // defaultValue={detailIntroduction}
          value={detailIntroduction}
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
      </div>
      {isLogin ? (
        <Button
          sx={{
            width: "467px",
            height: "53px",
            fontFamily: "preBd",
            fontSize: "18px",
          }}
          color="greenary"
          variant="contained"
          onClick={onUserUpdate}
        >
          저장하기
        </Button>
      ) : (
        <Button
          sx={{
            width: "467px",
            height: "53px",
            fontFamily: "preBd",
            fontSize: "18px",
          }}
          color="greenary"
          variant="contained"
          onClick={onUserLogin}
        >
          회원가입
        </Button>
      )}
    </div>
  );
}
