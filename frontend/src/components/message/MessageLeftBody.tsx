import React from 'react'
import styles from './MessageLeftBody.module.css'

import MessageItem from './MessageItem'

export default function MessageLeftBody() {
  return (
    <div className={styles.messageLeftBody}>
      <MessageItem/>
      <MessageItem/>
      <MessageItem/>
    </div>
  )
}