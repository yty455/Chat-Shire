import React from 'react'
import styles from './RightLinkTab.module.css'
import LinkOGItem from './LinkOGItem';

export default function RightLinkTab() {

  return (
    <div className={styles.MessageRightBody}>
      <span className={styles.MessageRightBodyTitle}>
        링크
      </span>
      <div className={styles.BookMarkContainer}>
        <LinkOGItem/>
        <LinkOGItem/>
        <LinkOGItem/>
        <LinkOGItem/>
      </div>
    </div>
  )
}
