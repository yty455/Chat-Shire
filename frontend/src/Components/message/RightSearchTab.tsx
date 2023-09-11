import React from 'react'
import styles from './RightSearchTab.module.css'
import TextField from '@mui/material/TextField';

export default function RightSearchTab() {

  return (
    <div className={styles.MessageRightBody}>
      <span className={styles.MessageRightBodyTitle}>
        검색
      </span>
      <div className={styles.GoogleSearchContainer}>
        <TextField style={{ marginTop: "10px", width: "500px"}} id="standard-basic" label="Google" variant="standard" />
      </div>
    </div>
  )
}
