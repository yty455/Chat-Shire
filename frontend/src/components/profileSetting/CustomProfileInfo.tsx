import React from 'react'
import styles from './CustomProfileInfo.module.css'

import TextField from '@mui/material/TextField';

export default function CustomProfileInfo() {
  return (
    <div className={styles.ProfileInfoContainer}>
      <div className={styles.ProfileInfoHeader}>
        <span className={styles.AvatarCustomTitle}>INFO</span>
      </div>
      <div className={styles.ProfileInfoBody}>
        <TextField size="small" sx={{width: "340px", marginBottom: "20px"}} id="nickname" label="닉네임" variant="outlined" />
        <TextField size="small" sx={{width: "340px", marginBottom: "20px"}} id="skills" label="기술스택" variant="outlined" />
        <TextField size="small" sx={{width: "340px", marginBottom: "20px"}} id="introduce" label="소개" variant="outlined" />
        <TextField size="small" sx={{width: "340px", marginBottom: "20px"}} id="introduce2" label="소개2" variant="outlined" />
      </div>
    </div>
  )
}
