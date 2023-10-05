import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import styles from "./SetGitRepo.module.css";

export default function SetGitRepo({
  onData,
  data,
}: {
  onData: (
    gitRepository: string,
    branch: string,
    gitAccessToken: string
  ) => void;
  data: any;
}) {
  const [gitRepository, setGitRepository] = useState("");
  const [branch, setBranch] = useState("");
  const [gitAccessToken, setGitAccessToken] = useState("");

  // 입력 값이 변경될 때마다 상태 업데이트
  const handlegitRepositoryChange = (e: any) => {
    setGitRepository(e.target.value);
    // 변경된 값 전달
    onData(e.target.value, branch, gitAccessToken);
  };

  const handlebranchChange = (e: any) => {
    setBranch(e.target.value);
    // 변경된 값 전달
    onData(gitRepository, e.target.value, gitAccessToken);
  };
  const handlegitAccessTokenChange = (e: any) => {
    setGitAccessToken(e.target.value);
    // 변경된 값 전달
    onData(gitRepository, branch, e.target.value);
  };

  return (
    <div>
      <TextField
        color="greenary"
        margin="dense"
        fullWidth
        className={styles.inputtag}
        required
        id="standard-required"
        label="깃 주소"
        defaultValue={data.gitRepository}
        onChange={handlegitRepositoryChange}
        variant="standard"
        style={{
          display: "flex",
          flexDirection: "column",
          border: "none",
          width: "600px",
        }}
        // helperText="Please enter your name"
      />

      <TextField
        fullWidth
        color="greenary"
        margin="dense"
        className={styles.inputtag}
        required
        id="outlined-multiline-static"
        label="브랜치 : 깃 로그를 추적할 브랜치를 설정하세요"
        onChange={handlebranchChange}
        defaultValue={data.branch}
        variant="standard"
        // helperText="Please enter your name"
      />
      <TextField
        fullWidth
        color="greenary"
        margin="dense"
        className={styles.inputtag}
        required
        id="outlined-multiline-static"
        label="깃 토큰 : 깃 로그를 추적하기 위해 깃 토큰이 필요합니다"
        onChange={handlegitAccessTokenChange}
        defaultValue={data.gitAccessToken}
        variant="standard"
        // helperText="Please enter your name"
      />
    </div>
  );
}
