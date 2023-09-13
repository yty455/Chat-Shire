import React from 'react'
import { useEffect } from 'react'
import styles from './RightLinkTab.module.css'
import axios from 'axios'

export default function RightLinkTab() {

  useEffect(() => {
    fetch('https://naver.com')
    .then(res => console.log(res))
  }, [])
  

  return (
    <div className={styles.MessageRightBody}>
      <span className={styles.MessageRightBodyTitle}>
        링크
      </span>
      <div className={styles.BookMarkContainer}>
      </div>
    </div>
  )
}
