import React from 'react'
import styles from './Message.module.css'
import photoImg from '../../assets/chat_icons/photo.png'
import fileImage from '../../assets/chat_icons/file.png'
import linkImg from '../../assets/chat_icons/link2.png'
import searchImg from '../../assets/chat_icons/search.png'

import MessageItem from './MessageItem'

import { BsPeopleFill, BsQuestionCircle, BsFillMegaphoneFill, BsPlus, BsEmojiKiss } from 'react-icons/bs'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Message() {

  const ariaLabel = { 'aria-label': 'description' };

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageLeft}>
        <div className={styles.messageLeftHeader}>
          <div className={styles.messageLeftHeader}>
            <div className={styles.messageLeftHeaderLeft}>
              <span className={styles.messageLeftTitle}>
                2차 특화 PJT
              </span>
              <BsPeopleFill size={28}/>
              <span className={styles.messagePeopleNum}>
                6
              </span>
            </div>
            <BsQuestionCircle size={34}/>
          </div>
        </div>
        <div className={styles.messageLeftNotification}>
        <BsFillMegaphoneFill size={30}/>
        <span className={styles.notificationText}>다음 회의 일정은 일요일 오후 3시 입니다.</span>
        </div>
        <div className={styles.messageLeftBody}>
          <MessageItem/>
          <MessageItem/>
          <MessageItem/>
        </div>
        <div className={styles.messageLeftFooter}>
          <div className={styles.messageInputContainer}>
            <Input className={styles.messageInput} placeholder="Placeholder" inputProps={ariaLabel} />
          </div>
          <div className={styles.messageFooterButtonContainer}>
            <div className={styles.messageFooterButtonLeft}>
              <BsPlus size={40} color="#39A789"/>
              <BsEmojiKiss size={30} color="#39A789"/>
            </div>
            <Button color='greenary' type="submit" className={styles.messageSendButton} variant="contained" endIcon={<SendIcon />}>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.messageRight}>
        <div className={styles.messageRightTabContainer}>
          <div className={styles.messageRightTabItem}>
            <img src={photoImg} alt="" />
          </div>
          <div className={styles.messageRightTabItem}>
            <img src={fileImage} alt="" />
          </div>
          <div className={styles.messageRightTabItem}>
            <img src={linkImg} alt="" />
          </div>
          <div className={styles.messageRightTabItem}>
            <img src={searchImg} alt="" />
          </div>
        </div>
        <div className={styles.messageRightBody}>

        </div>
      </div>
    </div>
  )
}
