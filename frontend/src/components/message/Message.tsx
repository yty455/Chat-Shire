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
import { getChat, postChat } from "../../utils/chatApi";
import { Stomp, CompatClient } from "@stomp/stompjs";

import { useSetRecoilState } from "recoil";

import EmojiPicker from "emoji-picker-react";

import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import AWS from "aws-sdk";

// function DraggableMessageItem({ message }: { message: string }) {
//   // 드래그 가능한 아이템으로 만들기 위해 useDrag 훅을 사용합니다.
//   const [{ isDragging }, ref] = useDrag({
//     type: ItemTypes.MESSAGE, // 드래그 타입
//     item: { message }, // 전달할 데이터
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={ref}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: "move",
//         // ...추가적인 스타일 설정
//       }}
//     >
//       {/* 메세지 아이템 내용 표시 */}
//       {message}
//     </div>
//   );
// }

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

  useEffect(() => {
    if (message) {
      newMessage(message);
    }
  }, [message]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [preMessage])

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
      postChat(Number(projectId), e.target.value)
      e.target.value = ""
    }
  };

  const sendMessage = (e: any) => {
    const message = document.getElementById("chatInput") as HTMLInputElement;
    if (message.value != "") {
      postChat(Number(projectId), message.value)
      message.value = ""
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
    messageEndRef.current?.scrollIntoView()
  }, []);

  const ariaLabel = { "aria-label": "description" };

  // 미디어 업로드
  const props: UploadProps = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // 업로드 할 서버
    beforeUpload: (file) => {
      const isJpgOrPngOrGif =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "video/mp4";
      if (!isJpgOrPngOrGif) {
        window.alert("jpg, jpeg, png, mp4만 업로드해주세요");
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
      const acceptedExtensions = ["pdf", "docx", "doc", "xlsx", "xls", "txt"];
      const isFileAccepted = acceptedExtensions.some((ext) =>
        file.name.endsWith(`.${ext}`)
      );
      if (!isFileAccepted) {
        window.alert("PDF, DOCX, DOC, XLSX, XLS 및 TXT 파일만 업로드해주세요.");
      }
      return isFileAccepted || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  // s3 이미지 업로드
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) { // 파일 선택 취소 시
      return Promise.resolve();
    }
    const fileExt = file.name.split('.').pop();
    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG', 'mp4', 'MP4'].includes(fileExt)) {
        window.alert('jpg, png, jpg, mp4 파일만 업로드가 가능합니다.');
        return Promise.resolve(); 
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 파일 업로드 
    return new Promise<void>((resolve) => { 
        reader.onload = () => {
          // 이미지 경로 선언
            setImageSrc(reader.result || null);
            // 이미지 파일 선언
            setImageFile(file);
            resolve();
        };
    });
}

  // s3에 업로드
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
            ACL: 'public-read',
            Bucket: 'chat-shire',
            Key: `chat/${imageFile.name}`,
            Body: imageFile,
        }
    })

    upload.promise()
    .then(() => {
      console.log('업로드')
    })}

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
            <div style={{width: "0px", height: "0px", visibility: "hidden"}} ref={messageEndRef}></div>
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
              {/* <input
              accept="image/*, video/*" 
              multiple 
              type="file"
              ref={el => (inputRef.current[0] = el)}
              onChange={e => onUpload(e)}
              />
              <button type="button"
              onClick={() => {
                  if (!imageSrc) {
                      window.alert('이미지를 등록해 주세요.');
                      return;
                  }

                  const formData = new FormData();
                  formData.append('file', imageFile);
                  formData.append('name', imageFile.name);

                  uploadS3(formData);
              }}
        >업로드!</button> */}
              <Upload showUploadList={false} multiple={true} {...fileProps}>
                <BsPaperclip
                  style={{ cursor: "pointer" }}
                  size={28}
                  color="#39A789"
                />
              </Upload>
              {/* <Upload showUploadList={false} multiple={true} {...props}> */}
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
                  ref={el => (inputRef.current[0] = el)}
                  onChange={e => {
                    onUpload(e).then(() => {
                      if (!imageSrc) {
                        window.alert('이미지를 등록해 주세요.');
                        return;
                      }

                      const formData = new FormData();
                      formData.append('file', imageFile);
                      formData.append('name', imageFile.name);

                      uploadS3(formData);
                    });
                }}
                />
              {/* </Upload> */}
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
          <button style={{border: 'none', background:'none'}} value="media" onClick={handleChange}>
            <HiOutlinePhoto style={{background: selectedButton === "media" ? 'yellow' : 'none', fontSize:'25px', color: '#39a789'}}/>
          </button>
          <button style={{border: 'none', background:'none'}} value="files" onClick={handleChange}>
            <AiOutlineFolder style={{background: selectedButton === "files" ? 'yellow' : 'none', fontSize:'25px', color: '#39a789'}}/>
          </button>
          <button style={{border: 'none', background:'none'}} value="links" onClick={handleChange}>
            <BsLink45Deg style={{background: selectedButton === "links" ? 'yellow' : 'none', fontSize:'28', color: '#39a789'}}/>
          </button>
          <button style={{border: 'none', background:'none'}} value="search" onClick={handleChange}>
            <LiaSearchSolid style={{background: selectedButton === "search" ? 'yellow' : 'none', fontSize:'25', color: '#39a789'}}/>
          </button>
        </div>
        <MessageRightBody value={value} />
      </div>
    </div>
  );
}

export default Message;
