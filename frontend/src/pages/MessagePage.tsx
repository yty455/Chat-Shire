import React from 'react'
import styles from './MessagePage.module.css'
import LeftSideTab from '../components/common/LeftSideTab'
import Message from '../components/message/Message'
import IndivTask from '../components/common2/IndivTask'

export default function MessagePage() {
  return (
    <div className={styles.messagePageContainer}>
      {/* <LeftSideTab/> */}
      <Message/>
      {/* <IndivTask/> */}
    </div>
  )
}
