import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Message.module.css";
import MessageItem from "./MessageItem";
import MessageRightBody from "./MessageRightBody";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import {
  BsPeopleFill,
  BsQuestionCircle,
  BsFillMegaphoneFill,
  BsEmojiKiss,
  BsPaperclip,
  BsLink45Deg,
} from "react-icons/bs";
// import {HiOutlinePhoto} from "react-icons/hi"
import { HiOutlinePhoto } from "react-icons/hi2";
import { AiOutlineFolder } from "react-icons/ai";
import { LiaSearchSolid } from "react-icons/lia";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import SendIcon from "@mui/icons-material/Send";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import SockJS from "sockjs-client";
import { getChat, postChat, putNotification } from "../../utils/chatApi";
import { getProject } from "../../utils/projectApi";
import { Stomp, CompatClient } from "@stomp/stompjs";

import { useSetRecoilState } from "recoil";

import EmojiPicker from "emoji-picker-react";

import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import AWS from "aws-sdk";
import { getProjectMem } from "../../utils/projectApi";

import { QuestionCircleOutlined  } from '@ant-design/icons';
import { FloatButton, Popover } from 'antd';

interface MessageProps {
  projectId: string;
}

interface MessageObject {
  userId: string;
  chatTime: string;
  content: string;
}

function Message({ projectId }: MessageProps) {
  // const projectId = useParams().projectId;
  // console.log("Message", projectId);
  const [value, setValue] = useState("media");
  const [preMessage, setPreMessage] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [selectedButton, setSelectedButton] = useState("media");
  const [imageFile, setImageFile]: any = useState(null);
  const [imageSrc, setImageSrc]: any = useState(null);
  const inputRef = useRef<any[]>([]);
  const [noticeInputVisible, setNoticeInputVisible] = useState(false);
  const [noticeInputValue, setNoticeInputValue] = useState('');
  const [notice, setNotice] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  const [pjtName, setPjtName] = useState<any>('');
  const [pjtMemCount, setPjtMemCount] = useState(0);


  const handleChange = (e: any) => {
    console.log(e.currentTarget);
    e.preventDefault();
    setValue(e.currentTarget.value);
    setSelectedButton(e.currentTarget.value);
  };

  const [activateEmojiPicker, setActivateEmojiPicker] = useState(false);

  const client = useRef<CompatClient>();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  function newMessage(newMessage: any) {
    const newPreMessage = [...preMessage, newMessage];
    setPreMessage(newPreMessage);
  }

  const getpjt = async () => {
    try {
      const response = await getProject(projectId);
      console.log(response.data.result[0]);
      // setPjt(response.data.result[0]);
      console.log('불러온 공지', response.data.result[0].notification)
      setNotice(response.data.result[0].notification)
      console.log('플젝 이름', response.data.result[0].name)
      setPjtName(response.data.result[0].name)
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectUsers = async () => {
    try {
      const response = await getProjectMem(projectId);
      console.log(response.data.count);
      setPjtMemCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (message) {
      newMessage(message);
    }
    getpjt()
    getProjectUsers()
  }, [message, notice]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [preMessage]);

  const connectHandler = () => {
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
    if (e.code === "Enter" && e.target.value != "") {
      postChat(Number(projectId), e.target.value);
      e.target.value = "";
    }
  };

  const sendMessage = (e: any) => {
    const message = document.getElementById("chatInput") as HTMLInputElement;
    if (message.value != "") {
      postChat(Number(projectId), message.value);
      message.value = "";
    }
  };

  // 공지 등록
  const makeNotice = (e: any) => {
    if (e.target.value != "") {
      putNotification(projectId, e.target.value);
      // setNotice(e.target.value);
      console.log('입력된 공지', e.target.value)
      setNoticeInputVisible(false);
      setShowNotice(true);
    }
  }

  const inputEmoji = (e: any) => {
    postChat(Number(projectId), e.emoji);
  };

  const handleEmojiPicker = () => {
    setActivateEmojiPicker(!activateEmojiPicker);
  };

  useEffect(() => {
    connectHandler();
    messageEndRef.current?.scrollIntoView();
  }, []);

  const ariaLabel = { "aria-label": "description" };

  //     const acceptedExtensions = ["pdf", "docx", "doc", "xlsx", "xls", "txt"];

  // 이미지 업로드
  const onUploadImage = (e: any): Promise<void> => {
    // Promise<void> 타입 지정
    return new Promise((resolve, reject) => {
      const file = e.target.files[0];
      if (!file) {
        resolve();
        return;
      }
      const fileExt = file.name.split(".").pop();
      if (
        !["jpeg", "png", "jpg", "JPG", "PNG", "JPEG", "mp4", "MP4"].includes(
          fileExt
        )
      ) {
        window.alert("jpg, png, jpg, mp4 파일만 업로드가 가능합니다.");
        resolve();
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || "");
        setImageFile(file);

        if (!reader.result) {
          window.alert("이미지를 등록해 주세요.");
          resolve();
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);

        uploadS3(formData)
          .then(() => resolve())
          .catch((error) => reject(error));
      };
    });
  };

  // 파일 업로드
  const onUploadFile = (e: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      const file = e.target.files[0];
      if (!file) {
        resolve();
        return;
      }
      
      const fileExt = file.name.split(".").pop();
      if (!["pdf", "docx", "doc", "xlsx", "xls", "txt"].includes(fileExt)) {
        window.alert("pdf, docx, doc, xlsx, xls, txt 파일만 업로드가 가능합니다.");
        resolve();
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
  
        if (!reader.result) {
          window.alert("파일을 등록해 주세요.");
          resolve();
          return;
        }
  
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
  
        uploadS3File(formData)
          .then(() => resolve())
          .catch((error) => reject(error));
       };
    });
  };

  // s3에 파일 업로드
  const uploadS3File = (formData: any) => {
    return new Promise((resolve, reject) => {
      const REGION = process.env.REACT_APP_REGION;
      const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
      const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  
      AWS.config.update({
        region: REGION,
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      });
  
      // 파일 이름 가져오기
      let fileName; 
      for (let value of formData.values()) { 
         if(value instanceof File){
           fileName=value.name; 
           break;
         }
       }
  
       if(fileName){
         // S3 ManagedUpload 객체 생성
         const upload = new AWS.S3.ManagedUpload({
           params: {
             ACL: 'public-read',
             Bucket: 'chat-shire',
             Key: `chat/${fileName}`,
             Body: formData.get('file'),
           },
         });
  
         // 업로드 시작하고 프로미스 반환
         upload.promise().then(() => {
            console.log("파일 업로드 완료");
          }).catch((error) => {
            console.error("업로드 실패", error);
            reject(error);
          });
       } else{
          console.error("파일 이름을 가져오는데 실패했습니다.");
          reject(new Error("파일 이름을 가져오는데 실패했습니다."));
       }
    });
  };

  // s3에 이미지 업로드
  const uploadS3 = (formData: any) => {
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Bucket: "chat-shire",
        Key: `chat/${imageFile.name}`,
        Body: imageFile,
      },
    });

    return upload.promise().then(() => {
      console.log("업로드");
    });
  };

  // 가이드
  const content = (
    <div>
      <p style={{margin: 0, fontFamily:'preRg'}}>드래그 앤 드롭으로 메세지를 태스크에 추가해보세요.</p>
      {/* <p style={{margin: 0, fontFamily:'preRg'}}>멘트 추가</p> */}
    </div>
  );

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageLeft}>
        <div className={styles.messageLeftHeader}>
          <div className={styles.messageLeftHeader}>
            <div className={styles.messageLeftHeaderLeft}>
              {/* <span className={styles.messageLeftTitle}>{pjtName}</span> */}
              <span className={styles.messageLeftTitle}>2차 플젝</span>
              <BsPeopleFill style={{color: 'grey', marginTop: '6px', marginLeft: '12px'}} size={20} />
              <span className={styles.messagePeopleNum}>{pjtMemCount}</span>
            </div>
            {/* <BsQuestionCircle style={{color: 'grey', marginTop: '6px'}} size={20} /> */}
            <Popover placement="left" content={content} trigger="hover">
              <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ width: 22, height:20, top: 78, left: 765 }} />
            </Popover>
          </div>
        </div>
        <div className={styles.messageLeftNotification}>
        <BsFillMegaphoneFill size={20} onClick={() => {
          if(noticeInputVisible) {
            setNoticeInputVisible(false);
            if(notice !== '') setShowNotice(true);
          } else {
            setNoticeInputVisible(true); 
          }
        }} />
        {noticeInputVisible ? (
          <input 
              maxLength={38}
              style={{width: '460px',border: 'none',marginLeft: '5px', fontFamily:'preRg'}}
              placeholder={notice}
              type="text"
              value={noticeInputValue}
              onChange={(e) => setNoticeInputValue(e.target.value)}
              onKeyPress={(e) => makeNotice(e)}
          />
        ) : showNotice ? (
          <span className={styles.notificationText}>
            {notice}
          </span>
        ) : null }
        </div>
        <div className={styles.messageLeftBody}>
          {preMessage &&
            preMessage.map((message) => <MessageItem message={message} />)}
          <div
            style={{ width: "0px", height: "0px", visibility: "hidden" }}
            ref={messageEndRef}
          ></div>
        </div>
        <div className={styles.messageLeftFooter}>
          <div className={styles.messageInputContainer}>
            <Input
              id="chatInput"
              style={{
                marginLeft: 0,
                fontFamily: "preRg",
                marginBottom: "5px",
                fontSize: "17px",
              }}
              className={styles.messageInput}
              placeholder=" 메세지를 입력해주세요"
              inputProps={ariaLabel}
              onKeyPress={inputMessage}
            />
          </div>
          <div className={styles.messageFooterButtonContainer}>
            <div className={styles.messageFooterButtonLeft}>
              <BsPaperclip
                style={{ cursor: "pointer" }}
                size={28}
                color="#39A789"
                onClick={() => inputRef.current[1].click()}
              />
              <input
                hidden
                accept=".pdf, .docx, .doc, .xlsx, .xls, .txt"
                type="file"
                ref={(el) => (inputRef.current[1] = el)}
                onChange={(e) => {
                  onUploadFile(e).then(() => {
                    console.log('업로드??')
                  });
                }}
              />
              <HiOutlinePhoto
                style={{ marginRight: "7px", cursor: "pointer" }}
                size={30}
                color="#39A789"
                onClick={() => inputRef.current[0].click()}
              />
              <input
                hidden
                accept="image/*, video/*"
                multiple
                type="file"
                ref={(el) => (inputRef.current[0] = el)}
                onChange={(e) => {
                  onUploadImage(e).then(() => {
                    if (!imageSrc) {
                      window.alert("이미지를 등록해 주세요.");
                      return;
                    }
                  });
                }}
              />
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
              style={{ borderRadius: '20px' }} 
            ></Button>
          </div>
        </div>
      </div>
      <div className={styles.messageRight}>
        <div className={styles.messageRightTabContainer}>
          <button
            style={{ border: "none", background: "none" }}
            value="media"
            onClick={handleChange}
          >
            <HiOutlinePhoto
              style={{
                background: selectedButton === "media" ? "yellow" : "none",
                fontSize: "25px",
                color: "#39a789",
              }}
            />
          </button>
          <button
            style={{ border: "none", background: "none" }}
            value="files"
            onClick={handleChange}
          >
            <AiOutlineFolder
              style={{
                background: selectedButton === "files" ? "yellow" : "none",
                fontSize: "25px",
                color: "#39a789",
              }}
            />
          </button>
          <button
            style={{ border: "none", background: "none" }}
            value="links"
            onClick={handleChange}
          >
            <BsLink45Deg
              style={{
                background: selectedButton === "links" ? "yellow" : "none",
                fontSize: "28",
                color: "#39a789",
              }}
            />
          </button>
          <button
            style={{ border: "none", background: "none" }}
            value="search"
            onClick={handleChange}
          >
            <LiaSearchSolid
              style={{
                background: selectedButton === "search" ? "yellow" : "none",
                fontSize: "25",
                color: "#39a789",
              }}
            />
          </button>
        </div>
        <MessageRightBody value={value} />
      </div>
    </div>
  );
}

export default Message;
