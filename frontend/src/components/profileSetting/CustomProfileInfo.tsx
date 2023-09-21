import React, { useState } from "react";
import styles from "./CustomProfileInfo.module.css";

import TextField from "@mui/material/TextField";

interface CustomProfileProps {
  onUpdatenickname: any;
  onUpdateintroduction: any;
  onUpdatedetailIntroduction: any;
  onUpdatemySkill: any;
  onUserLogin: () => void;
}

export default function CustomProfileInfo({
  onUpdatenickname,
  onUpdateintroduction,
  onUpdatedetailIntroduction,
  onUpdatemySkill,
  onUserLogin,
}: CustomProfileProps) {
  const [nickname, setnickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [detailIntroduction, setDetailIntroduction] = useState("");
  const [mySkill, setMySkill] = useState<string[]>([]);

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
    }
  };

  return (
    <div className={styles.ProfileInfoContainer}>
      <div className={styles.ProfileInfoHeader}>
        <span className={styles.AvatarCustomTitle}>내 정보</span>
      </div>
      <div className={styles.ProfileInfoBody}>
        <TextField
          size="small"
          sx={{ width: "340px", marginBottom: "20px" }}
          id="nickname"
          name="nickname"
          label="닉네임"
          value={nickname}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          size="small"
          sx={{ width: "340px", marginBottom: "20px" }}
          id="skills"
          label="기술스택"
          name="mySkill"
          InputProps={{ onKeyPress: handleMySkillInputChange }}
          variant="outlined"
        />
        <ul>
          {mySkill.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <TextField
          size="small"
          sx={{ width: "340px", marginBottom: "20px" }}
          id="introduce"
          label="소개"
          name="introduction"
          value={introduction}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          size="small"
          sx={{ width: "340px", marginBottom: "20px" }}
          id="introduce2"
          label="소개2"
          name="detailIntroduction"
          value={detailIntroduction}
          onChange={handleInputChange}
          variant="outlined"
        />
      </div>
      <button onClick={onUserLogin}>회원가입</button>
    </div>
  );
}
