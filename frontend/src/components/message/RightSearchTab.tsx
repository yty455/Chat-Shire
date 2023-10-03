import React, { useEffect } from 'react'
import styles from './RightSearchTab.module.css'
import GoogleSearch from './GoogleSearch'

export default function RightSearchTab() {

  return (
    <div className={styles.MessageRightBody}>
      {/* <span className={styles.MessageRightBodyTitle}>
        검색
      </span> */}
      <div className={styles.GoogleSearchContainer}>
        <GoogleSearch/>
      </div>
    </div>
  )
}

