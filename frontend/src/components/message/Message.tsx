import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Message.module.css";
import MessageItem from "./MessageItem";
import MessageRightBody from "./MessageRightBody";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import {
  BsPeopleFill,
  BsQuestionCircle,
  BsFillMegaphoneFill,
  BsEmojiKiss,
  BsPaperclip
} from "react-icons/bs";
import {HiOutlinePhoto} from "react-icons/hi2";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import SendIcon from "@mui/icons-material/Send";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import SockJS from "sockjs-client";
import { getChat, postChat } from "../../utils/chatApi";
import { Stomp, CompatClient } from "@stomp/stompjs";

import { useSetRecoilState } from "recoil";

import EmojiPicker from "emoji-picker-react";

interface MessageProps {
  projectId: string;
}

function Message({ projectId }: MessageProps) {
  // const projectId = useParams().projectId;
  console.log("Message", projectId);
  const [value, setValue] = useState("photos");
  const [preMessage, setPreMessage] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [activateEmojiPicker, setActivateEmojiPicker] = useState(false);

  const client = useRef<CompatClient>();

  const connectHandler = () => {
    console.log(projectId);
    client.current = Stomp.over(() => {
      const sock = new SockJS(
        "http://j9e205.p.ssafy.io:8080/gs-guide-websocket"
      );
      return sock;
    });
    client.current.connect(
      {
        "Content-Type": "application/json",
      },
      () => {
        // callback 함수 설정, 대부분 여기에 sub 함수 씀
        client.current?.subscribe(`/topic/greetings`, (message) => {
          setMessage(JSON.parse(message.body));
        });
      }
    );
    getChat(Number(projectId), 1, 1)
      .then((res) => {
        setPreMessage(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  };

  const inputMessage = (e: any) => {
    if (e.code === "Enter") {
      postChat(Number(projectId), e.target.value);
    }
  };

  const sendMessage = (e: any) => {
    const message = document.getElementById("chatInput") as HTMLInputElement;
    if (message.value != "") {
      postChat(Number(projectId), message.value);
    }
  };

  const inputEmoji = (e: any) => {
    postChat(Number(projectId), e.emoji);
  };

  const handleEmojiPicker = () => {
    setActivateEmojiPicker(!activateEmojiPicker);
  };

  useEffect(() => {
    connectHandler();
  }, []);

  const ariaLabel = { "aria-label": "description" };

  // 미디어 업로드
  const props: UploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // 업로드 할 서버
    beforeUpload: (file) => {
      const isJpgOrPngOrGif = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'video/mp4' || file.type === 'video/x-msvideo' || file.type === 'video/quicktime';
      if (!isJpgOrPngOrGif) {
        window.alert('이미지 또는 동영상만 업로드해주세요');
      }
      return isJpgOrPngOrGif || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
      // uid: 고유 식별자
      // name: 원래 이름
      // status: 'uploading', 'done', 'error' 또는 'removed' 중 하나
      // response: 서버 응답 (업로드가 성공한 경우)
      // url: 파일 URL (서버에서 지정)
    },
  };
  
  // 파일 업로드
  const fileProps: UploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // 업로드 할 서버
    beforeUpload: (file) => {
      const isFile = file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'video/mp4' && file.type !== 'video/x-msvideo' && file.type !== 'video/quicktime';
      if (!isFile) {
        window.alert('이미지, 동영상을 제외한 파일만 업로드해주세요.');
      }
      return isFile || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageLeft}>
        <div className={styles.messageLeftHeader}>
          <div className={styles.messageLeftHeader}>
            <div className={styles.messageLeftHeaderLeft}>
              <span className={styles.messageLeftTitle}>2차 특화 PJT</span>
              <BsPeopleFill size={20} />
              <span className={styles.messagePeopleNum}>6</span>
            </div>
            <BsQuestionCircle size={22} />
          </div>
        </div>
        <div className={styles.messageLeftNotification}>
          <BsFillMegaphoneFill size={20} />
          <span className={styles.notificationText}>
            다음 회의 일정은 일요일 오후 3시 입니다.
          </span>
        </div>
        <div className={styles.messageLeftBody}>
          {preMessage &&
            preMessage.map((message) => <MessageItem message={message} />)}
        </div>
        <div className={styles.messageLeftFooter}>
          <div className={styles.messageInputContainer}>
            <Input
              id="chatInput"
              style={{
                marginLeft: 0,
                fontFamily: "preRg",
                marginBottom: "5px",
                fontSize: '17px'
              }}
              className={styles.messageInput}
              placeholder=" 메세지를 입력해주세요"
              inputProps={ariaLabel}
              onKeyDown={inputMessage}
            />
          </div>
          <div className={styles.messageFooterButtonContainer}>
            <div className={styles.messageFooterButtonLeft}>
              <Upload showUploadList={false} multiple={true} {...fileProps}>
                <BsPaperclip style={{ cursor: "pointer" }} size={28} color="#39A789"/>
              </Upload>
              <Upload showUploadList={false} multiple={true} {...props}>
                <HiOutlinePhoto style={{ marginRight: '7px', cursor: "pointer" }} size={30} color="#39A789"/>
              </Upload>
              <div style={{ position: "relative" }}>
                <Grow
                  in={activateEmojiPicker}
                  style={{ transformOrigin: "0 100% 0" }}
                >
                  <div className={styles.EmojiPickerContainer}>
                    <EmojiPicker
                      onEmojiClick={inputEmoji}
                      searchDisabled={true}
                    />
                  </div>
                </Grow>
                <BsEmojiKiss
                  style={{ cursor: "pointer" }}
                  onClick={handleEmojiPicker}
                  size={27}
                  color="#39A789"
                />
              </div>
            </div>
            <Button
              className={styles.messageSendButton}
              color="greenary"
              type="submit"
              variant="contained"
              onClick={sendMessage}
              endIcon={<SendIcon />}
            ></Button>
          </div>
        </div>
      </div>
      <div className={styles.messageRight}>
        <div className={styles.messageRightTabContainer}>
          <BottomNavigation
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              value="photos"
              icon={
                <img
                  style={{ marginBottom: "4px", width: "40px" }}
                  src={process.env.PUBLIC_URL + "/assets/chat_icons/photo.png"}
                  alt=""
                />
              }
              style={{
                color: "#39A789",
                margin: "6px 10px 6px 6px",
                padding: "0px",
                borderRadius: "100px",
                border: "1px solid #E5E8EB",
              }}
            />
            <BottomNavigationAction
              value="files"
              icon={
                <img
                  style={{ marginBottom: "4px", width: "40px" }}
                  src={process.env.PUBLIC_URL + "/assets/chat_icons/file.png"}
                  alt=""
                />
              }
              style={{
                color: "#39A789",
                margin: "6px 20px 6px 6px",
                padding: "0px",
                borderRadius: "100px",
                border: "1px solid #E5E8EB",
              }}
            />
            <BottomNavigationAction
              value="links"
              icon={
                <img
                  style={{ marginBottom: "4px", width: "40px" }}
                  src={process.env.PUBLIC_URL + "/assets/chat_icons/link2.png"}
                  alt=""
                />
              }
              style={{
                color: "#39A789",
                margin: "6px 20px 6px 6px",
                padding: "0px",
                borderRadius: "100px",
                border: "1px solid #E5E8EB",
              }}
            />
            <BottomNavigationAction
              value="search"
              icon={
                <img
                  style={{ marginBottom: "4px", width: "40px" }}
                  src={process.env.PUBLIC_URL + "/assets/chat_icons/search.png"}
                  alt=""
                />
              }
              style={{
                color: "#39A789",
                margin: "6px 20px 6px 6px",
                padding: "0px",
                borderRadius: "100px",
                border: "1px solid #E5E8EB",
              }}
            />
          </BottomNavigation>
        </div>
        <MessageRightBody value={value} />
      </div>
    </div>
  );
}

export default Message;
