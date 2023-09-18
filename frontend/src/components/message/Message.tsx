import React, { useEffect, useRef } from 'react'
import styles from './Message.module.css'
import photoImg from '../../assets/chat_icons/photo.png'
import fileImage from '../../assets/chat_icons/file.png'
import linkImg from '../../assets/chat_icons/link2.png'
import searchImg from '../../assets/chat_icons/search.png'

import MessageItem from './MessageItem'
import MessageRightBody from './MessageRightBody'

import { BsPeopleFill, BsQuestionCircle, BsFillMegaphoneFill, BsPlus, BsEmojiKiss } from 'react-icons/bs'
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { Stomp, CompatClient } from '@stomp/stompjs'
import SockJS from "sockjs-client";
import axios from 'axios'
import { useSetRecoilState } from 'recoil'

function Message() {
  const [value, setValue] = React.useState('photos');
  const [preMessage, setPreMessage] = React.useState<any[]>([])
  const [message, setMessage] = React.useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue)
    setValue(newValue);
  };


  const client = useRef<CompatClient>();

  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://j9e205.p.ssafy.io:8080/gs-guide-websocket")
      return sock;
    });
    client.current.connect(
      {
        "Content-Type": "application/json"
      },
      () => {
        // callback 함수 설정, 대부분 여기에 sub 함수 씀
        client.current?.subscribe(
         `/topic/greetings`,
          (message) => {
            // console.log(JSON.parse(message.body).content)
            setMessage(JSON.parse(message.body));
          },
        );
      }
    );
    axios.get('http://j9e205.p.ssafy.io:8080/projects/29/chats?page=0&size=100', {
      headers: {
        Accept: "application/json;charset=UTF-8",
        Authorization: "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTAxNTUyNCwiaWQiOjF9.c6T9C-EQ-2INoafAUgFKGljAWxFseBCz68aEN1F2MXdna0nrppoV8KkVLu6kNPO1Y-s3V2HmIvp_Jy7TLY0dYA"
      }
    })
    .then((res) => {
      console.log(res.data.result[0])
      setPreMessage(res.data.result[0])
      console.log(preMessage)
    })
  }

  const sendChat = () => {

  }

  useEffect(() => {
    connectHandler()
  }, [])

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
              <BsPeopleFill size={20}/>
              <span className={styles.messagePeopleNum}>
                6
              </span>
            </div>
            <BsQuestionCircle size={22}/>
          </div>
        </div>
        <div className={styles.messageLeftNotification}>
        <BsFillMegaphoneFill size={20}/>
        <span className={styles.notificationText}>다음 회의 일정은 일요일 오후 3시 입니다.</span>
        </div>
        <div className={styles.messageLeftBody}>
          {preMessage && preMessage.map(message => (
            <MessageItem message={message}/>
          ))}
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
          <BottomNavigation sx={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }} value={value} onChange={handleChange}>
            <BottomNavigationAction
              value="photos"
              icon={<img style={{ marginBottom: "4px", width: "40px" }} src={photoImg} alt="" />}
              style={{ color:"#39A789", margin: "6px 10px 6px 6px", padding: "0px", borderRadius: "100px", border: "1px solid #E5E8EB" }}
            />
            <BottomNavigationAction
              value="files"
              icon={<img style={{ marginBottom: "4px", width: "40px" }} src={fileImage} alt="" />}
              style={{ color:"#39A789", margin: "6px 20px 6px 6px", padding: "0px", borderRadius: "100px", border: "1px solid #E5E8EB" }}
            />
            <BottomNavigationAction
              value="links"
              icon={<img style={{ marginBottom: "4px", width: "40px" }} src={linkImg} alt="" />}
              style={{ color:"#39A789", margin: "6px 20px 6px 6px", padding: "0px", borderRadius: "100px", border: "1px solid #E5E8EB" }}
            />
            <BottomNavigationAction
              value="search" 
              icon={<img style={{ marginBottom: "4px", width: "40px" }} src={searchImg} alt="" />}
              style={{ color:"#39A789", margin: "6px 20px 6px 6px", padding: "0px", borderRadius: "100px", border: "1px solid #E5E8EB" }}
            />
          </BottomNavigation>
        </div>
        <MessageRightBody value={value}/>
      </div>
    </div>
  )
}

export default Message;