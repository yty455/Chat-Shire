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
import { FaLink } from "react-icons/fa";
import { BiSearch, BiSolidSearch } from "react-icons/bi";
// import {HiOutlinePhoto} from "react-icons/hi"
import { HiOutlinePhoto, HiPhoto } from "react-icons/hi2";
import { AiOutlineFolder, AiFillFolder } from "react-icons/ai";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import SendIcon from "@mui/icons-material/Send";

import SockJS from "sockjs-client";
import {
  getChat,
  postChat,
  putNotification,
  getFiles,
} from "../../utils/chatApi";
import { getProject } from "../../utils/projectApi";
import { Stomp, CompatClient } from "@stomp/stompjs";

import { useSetRecoilState } from "recoil";

import EmojiPicker from "emoji-picker-react";

import AWS from "aws-sdk";
import { getProjectMem } from "../../utils/projectApi";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";

interface MessageProps {
  projectId: string;
}

interface MessageObject {
  userId: string;
  chatTime: string;
  content: string;
}

interface User {
  nickname: string;
  profileImage: string;
  profileColor: string;
}

type FileInfo = {
  url: string;
  thumbnail: string;
};

function Message({ projectId }: MessageProps) {
  const [value, setValue] = useState("media");
  const [preMessage, setPreMessage] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [selectedButton, setSelectedButton] = useState("media");
  const [imageFile, setImageFile]: any = useState(null);
  const [imageSrc, setImageSrc]: any = useState(null);
  const inputRef = useRef<any[]>([]);
  const [noticeInputVisible, setNoticeInputVisible] = useState(false);
  const [noticeInputValue, setNoticeInputValue] = useState("");
  const [notice, setNotice] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [showNoticeInput, setShowNoticeInput] = useState(false);
  const [pjtName, setPjtName] = useState<any>("");
  const [pjtMemCount, setPjtMemCount] = useState(0);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [file, setFile] = useState([]);
  const [users, setUsers] = useState<User[]>([]);
  const [attachedFileInfos, setAttachedFileInfos] = useState<FileInfo[]>([]);

  const handleChange = (e: any) => {
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
      setNotice(response.data.result[0].notice);
      setPjtName(response.data.result[0].name);
    } catch (error) {
      console.error(error);
    }
  };

  const getImage = async () => {
    try {
      const response = await getFiles(projectId, "IMAGE");
      setImage(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const getVideo = async () => {
    try {
      const response = await getFiles(projectId, "VIDEO");
      setVideo(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const getFile = async () => {
    try {
      const response = await getFiles(projectId, "FILE");
      setFile(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectUsers = async () => {
    try {
      const response = await getProjectMem(projectId);
      setPjtMemCount(response.data.count);
      setUsers(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getpjt();
  }, []);

  useEffect(() => {
    if (message) {
      newMessage(message);
    }
    getpjt();
    getProjectUsers();
    getFile();
    getImage();
    getVideo();
  }, [message, notice, projectId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [preMessage, projectId]);

  useEffect(() => {
    if (imageFile) { // imageFile이 null이 아닌 경우에만 uploadS3 호출
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("name", imageFile.name);
  
      uploadS3(formData)
        .then(() => console.log('업로드 완료'))
        .catch((error) => console.error('업로드 실패:', error));
    }
  }, [imageFile]);

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
        client.current?.subscribe(
          `/topic/greetings/${projectId}`,
          (message) => {
            setMessage(JSON.parse(message.body));
          }
        );
      }
    );
    getChat(Number(projectId), 1, 1)
      .then((res) => {
        setPreMessage(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  };

  const inputMessage = (e: any) => {
    if (e.code === "Enter" && e.target.value !== "") {
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

  const makeNotice = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && noticeInputValue !== "") {
      putNotification(projectId, noticeInputValue)
        .then(() => {
          setNotice(noticeInputValue);
        })
        .catch((error) => {
          console.error("공지 업데이트 오류:", error);
        });
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
    messageEndRef.current?.scrollIntoView();
  }, [projectId]);

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
        window.alert("jpeg, png, jpg, mp4 파일만 업로드가 가능합니다.");
        resolve();
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || "");
        setImageFile(file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        e.target.value = null;
        
        //혹시 머 에러나면 이거 주석풀기
        // if (!reader.result) {
        //   window.alert("이미지를 등록해 주세요.");
        //   resolve();
        //   return;
        // }
   
        resolve(); // 업로드는 useEffect에서 처리하므로 여기서는 resolve()만 호출
      };
    });
   };
        // 두번째 시도
      //   setTimeout(() => {  
      //     if(imageFile) {
      //       uploadS3(formData)
      //         .then(() => resolve())
      //         .catch((error) => reject(error));
      //     }
      //   }, 0); 
      // }});}
     
  //   rkw가장 첫 버전   
  //     reader.onload = () => {
  //       setImageSrc(reader.result || "");
  //       setImageFile(file);
  //       if (!reader.result) {
  //         window.alert("이미지를 등록해 주세요.");
  //         resolve();
  //         return;
  //       }

  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("name", file.name);

  //       uploadS3(formData)
  //         .then(() => resolve())
  //         .catch((error) => reject(error));
  //     };
  //   });
  // };

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
        window.alert(
          "pdf, docx, doc, xlsx, xls, txt 파일만 업로드가 가능합니다."
        );
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
        formData.append("file", file);
        formData.append("name", file.name);

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
        if (value instanceof File) {
          fileName = value.name;
          break;
        }
      }

      if (fileName) {
        // S3 ManagedUpload 객체 생성
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "chat-shire",
            Key: `chat/file/${projectId}/${fileName}`,
            Body: formData.get("file"),
          },
        });

        // 업로드 시작하고 프로미스 반환
        upload
          .promise()
          .then(() => {
            console.log("파일 업로드 완료");
          })
          .catch((error) => {
            console.error("업로드 실패", error);
            reject(error);
          });
      } else {
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
        Key: `chat/media/${projectId}/${imageFile.name}`,
        Body: imageFile,
      },
    });

    return upload.promise().then(() => {
      console.log("미디어 업로드");
      const url = `https://chat-shire.s3.amazonaws.com/error/${imageFile.name}`
      attachedFileInfos.push({ url: url, thumbnail: url })

      setAttachedFileInfos(attachedFileInfos);

      postChat(Number(projectId), "", attachedFileInfos);
    });
  };

  // 가이드
  const content = (
    <div>
      <p style={{ margin: 0, fontFamily: "preRg" }}>
        드래그 앤 드롭으로 메세지를 태스크에 추가해보세요.
      </p>
      {/* <p style={{margin: 0, fontFamily:'preRg'}}>멘트 추가</p> */}
    </div>
  );

  const userList = (
    <div>
      <p style={{ margin: 0, fontFamily: "preRg" }}>
        {users &&
          users.map((user, index) => (
            <div key={index}>
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    backgroundColor: user.profileColor,
                    zIndex: "5",
                  }}
                  alt="profile"
                  src={user.profileImage}
                />
                <p style={{ margin: "0 0 0 3px", fontFamily: "preRg" }}>
                  {user.nickname}
                </p>
              </div>
              {/* <hr style={{ margin: '2px 0', border: '1px solid grey' }} /> */}
            </div>
          ))}
      </p>
    </div>
  );

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageLeft}>
        <div className={styles.messageLeftHeader}>
          <div className={styles.messageLeftHeader}>
            <div className={styles.messageLeftHeaderLeft}>
              {pjtName.length !== 0 && (
                <span className={styles.messageLeftTitle}>{pjtName}</span>
              )}
              {/* <span className={styles.messageLeftTitle}>2차 플젝</span> */}
              <Popover
                placement="rightBottom"
                content={userList}
                trigger="click"
              >
                <BsPeopleFill
                  style={{
                    color: "grey",
                    marginTop: "6px",
                    marginLeft: "12px",
                    cursor: "pointer",
                  }}
                  size={20}
                />
                <span className={styles.messagePeopleNum}>{pjtMemCount}</span>
              </Popover>
            </div>
            {/* <BsQuestionCircle style={{color: 'grey', marginTop: '6px'}} size={20} /> */}
            <Popover placement="left" content={content} trigger="hover">
              <QuestionCircleOutlined
                style={{ color: "grey", marginTop: "6px", fontSize: "20px" }}
              />
            </Popover>
          </div>
        </div>
        <div className={styles.messageLeftNotification}>
          <BsFillMegaphoneFill size={20} />
          {notice ? (
            <input
              maxLength={50}
              style={{
                width: "450px",
                border: "none",
                marginLeft: "5px",
                fontFamily: "preRg",
              }}
              placeholder={notice}
              type="text"
              defaultValue={notice}
              // value={noticeInputValue}
              onChange={(e) => {
                setNoticeInputValue(e.target.value);
                console.log(e.target.value);
              }}
              onKeyPress={(e) => makeNotice(e)}
            />
          ) : (
            <input
              maxLength={50}
              style={{
                width: "450px",
                border: "none",
                marginLeft: "5px",
                fontFamily: "preRg",
              }}
              type="text"
              onChange={(e) => {
                setNoticeInputValue(e.target.value);
                console.log(e.target.value);
              }}
              onKeyPress={(e) => makeNotice(e)}
            />
          )}
        </div>
        <div className={styles.messageLeftBody}>
          {preMessage &&
            preMessage.map((message) => (
              <MessageItem message={message} users={users} />
            ))}
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
                    console.log("업로드??");
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
                // onChange={(e) => {
                //   onUploadImage(e).then(() => {
                //     if (!imageSrc) {
                //       // window.alert("이미지를 등록해 주세요.");
                //       return;
                //     }
                //   });
                // }}
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
              style={{ borderRadius: "20px" }}
            ></Button>
          </div>
        </div>
      </div>
      <div className={styles.messageRight}>
        <div className={styles.messageRightTabContainer}>
          <button
            style={{ border: "none", background: "none", cursor: "pointer" }}
            value="media"
            onClick={handleChange}
          >
            {selectedButton === "media" ? (
              <>
                <HiPhoto className={styles.icon25} />
                <p className={styles.tabTitle}>사진</p>
              </>
            ) : (
              <HiOutlinePhoto className={styles.icon25} />
            )}
          </button>
          <button
            style={{ border: "none", background: "none", cursor: "pointer" }}
            value="files"
            onClick={handleChange}
          >
            {selectedButton === "files" ? (
              <>
                <AiFillFolder className={styles.icon25} />
                <p className={styles.tabTitle}>파일</p>
              </>
            ) : (
              <AiOutlineFolder className={styles.icon25} />
            )}
          </button>
          <button
            style={{ border: "none", background: "none", cursor: "pointer" }}
            value="links"
            onClick={handleChange}
          >
            {selectedButton === "links" ? (
              <>
                <FaLink
                  style={{
                    fontSize: "21",
                    color: "#39a789",
                    marginBottom: "2px",
                  }}
                />
                <p className={styles.tabTitle}>링크</p>
              </>
            ) : (
              <BsLink45Deg
                style={{
                  fontSize: "28",
                  color: "#39a789",
                }}
              />
            )}
          </button>
          <button
            style={{ border: "none", background: "none", cursor: "pointer" }}
            value="search"
            onClick={handleChange}
          >
            {selectedButton === "search" ? (
              <>
                <BiSolidSearch className={styles.icon25} />
                <p className={styles.tabTitle}>검색</p>
              </>
            ) : (
              <BiSearch className={styles.icon25} />
            )}
          </button>
        </div>
        <MessageRightBody value={value} projectId={projectId} />
      </div>
    </div>
  );
}

export default Message;
