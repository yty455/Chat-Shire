import React, { useState } from "react";
import styles from "./CustomProfileInfo.module.css";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'

import MultiSelect from "../error/MultiSelect";
import { useRecoilState } from "recoil";
import { isLogin_recoil } from "../../stores/atom";

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
  const [nickname, setnickname] = useState("");
  const [position, setposition] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [detailIntroduction, setDetailIntroduction] = useState("");
  const [mySkill, setMySkill] = useState<string[]>([]);
  const [isLogin, setIsLogin] = useRecoilState(isLogin_recoil)
  const [selectedId, setSelectedId] = useState<any[]>([]);

  const selectSkill = (e: any) => {
    console.log(e.target.id)
    if (selectedId.includes(String(e.target.id))) {
      const newSelectedId = [selectedId.filter(item => item != e.target.id)]
      setSelectedId(newSelectedId)
    } else {
      const newSelectedId = [...selectedId, String(e.target.id)]
      setSelectedId(newSelectedId)
    }
  }

  const handleMySkillInputChange = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    if (e.key === "Enter" && target.value.trim() !== "") {
      e.preventDefault(); // 기본 엔터 동작 방지

      const skillToAdd = target.value.trim();
      const updatedSkills = [...mySkill, skillToAdd];
      // 기존 스킬 배열에 새 스킬 추가
      setMySkill(updatedSkills);
      onUpdatemySkill(updatedSkills);

      // 인풋창 비우기
      target.value = "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickname") {
      setnickname(value);
      onUpdatenickname(value);
    } else if (name === "introduction") {
      setIntroduction(value);
      onUpdateintroduction(value);
    } else if (name === "detailIntroduction") {
      setDetailIntroduction(value);
      onUpdatedetailIntroduction(value);
    } else if (name === "position") {
      setposition(value);
      onUpdateposition(value);
    }
  };

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
          defaultValue=""
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <span style={{margin: "8px 0px -4px 0px", fontFamily: "preLt"}}>뭐할줄 알아여</span>
        <div className={styles.ProfileInfoSkillSelector}>
          <img id="1" onClick={selectSkill} className={styles.ProfileSkillIcon} src={selectedId.includes("1") ? `https://img.shields.io/badge/python-3777AB?style=for-the-badge&logo=python&logoColor=white` : `https://img.shields.io/badge/python-757575?style=for-the-badge&logo=python&logoColor=white`}/>
          <img id="2" onClick={selectSkill} className={styles.ProfileSkillIcon} src={selectedId.includes("2") ? `https://img.shields.io/badge/html-red?style=for-the-badge&logo=html&logoColor=white` : `https://img.shields.io/badge/html-757575?style=for-the-badge&logo=html&logoColor=white`}/>
        </div>
        <TextField
          fullWidth
          name="position"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="어떤 포지션을 맡고 계신가요?"
          defaultValue=""
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
        <TextField
          fullWidth
          name="introduction"
          color="greenary"
          margin="dense"
          required
          id="standard-required"
          label="나를 자랑 해주세요"
          defaultValue=""
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
          defaultValue=""
          variant="standard"
          onChange={handleInputChange}
          // helperText="Please enter your name"
        />
      </div>
      {isLogin ? <Button
        sx={{width: "467px", height: "53px", fontFamily: "preBd", fontSize: "18px"}}
        color="greenary"
        variant="contained"
        onClick={onUserLogin}
      >
        회원가입
      </Button> : <Button
        sx={{width: "467px", height: "53px", fontFamily: "preBd", fontSize: "18px"}}
        color="greenary"
        variant="contained"
        onClick={onUserUpdate}
      >
        저장하기
      </Button>
      }
      

    </div>
  );
}
