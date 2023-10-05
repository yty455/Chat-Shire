import React, { useEffect, useState } from "react";
import styles from "./IndivChatModal.module.css";
import {
  getReferences,
  deleteReferences,
  getReferencesChat,
} from "../../utils/taskReferenceApi";
import { Button } from "antd";
import { getProjectMem } from "../../utils/projectApi";

interface IndivChatModalProps {
  onClose: () => void;
  taskId: any;
  projectId: string;
}
interface ChatItem {
  userId?: string;
  nickname: string;
  content: string;
  chatTime: string;
  chatNumber: number;
  id: string;
}
interface Member {
  userId: string;
  nickname: string;
}

function IndivChatModal({ taskId, onClose, projectId }: IndivChatModalProps) {
  const [taskChat, setTaskChat] = useState<ChatItem[]>([]);
  const [reChat, setReChat] = useState<ChatItem[]>([]);
  const [chat, setChat] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [pjtMem, setpjtMem] = useState<Member[]>([]);

  const getTaskChat = async () => {
    try {
      const response = await getReferences(taskId);
      console.log(response.data.result[0]);
      setTaskChat(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectUsers = async () => {
    try {
      const response = await getProjectMem(projectId);
      console.log(response.data.result[0]);
      setpjtMem(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getInReChat = async (reId: string) => {
    try {
      const response = await getReferencesChat(reId);
      console.log(response.data);
      setReChat(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (reId: string) => {
    setSelectedChat(reId);
    getInReChat(reId);
  };

  const handleDelete = async () => {
    setSelectedChat("");
  };

  const deleteRe = async (chatId: string) => {
    try {
      const response = await deleteReferences(taskId, chatId);
      console.log(response.data.result);
      getTaskChat();
    } catch (error) {
      console.error(error);
    }
  };

  function formatChatTime(chatTime: any) {
    const date = new Date(chatTime);
    return date.toLocaleString(); // 브라우저 설정에 따라 로케일에 맞게 날짜 및 시간을 표시
  }

  useEffect(() => {
    getTaskChat();
    getProjectUsers();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      {selectedChat !== "" ? (
        <div className={styles.modalBox}>
          {reChat &&
            reChat.map((chat) => (
              <div key={chat.chatNumber} className={styles.chat}>
                {" "}
                <div className={styles.nickname}>
                  {" "}
                  {
                    pjtMem.find((member) => member.userId === chat.userId)
                      ?.nickname
                  }{" "}
                  :
                </div>
                <div
                  className={styles.content}
                  onClick={() => handleClick(chat.id)}
                >
                  {chat.content}
                </div>
                <div className={styles.chatTime}>
                  {" "}
                  : {formatChatTime(chat.chatTime)}
                </div>
              </div>
            ))}
          <button
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
            className={styles.closebtn}
          >
            {"<<"}
          </button>
        </div>
      ) : (
        <div className={styles.modalBox}>
          {taskChat &&
            taskChat.map((chat) => (
              <div key={chat.chatNumber} className={styles.chat}>
                {" "}
                <div className={styles.nickname}>{chat.nickname} : </div>
                <div
                  className={styles.content}
                  onClick={() => handleClick(chat.id)}
                >
                  {chat.content}
                </div>
                <div className={styles.chatTime}>
                  {" "}
                  : {formatChatTime(chat.chatTime)}
                </div>
                <button
                  className={styles.deletebtn}
                  style={{
                    backgroundColor: "red",
                    fontFamily: "preRg",
                  }}
                  onClick={() => deleteRe(chat.id)}
                >
                  삭제
                </button>
              </div>
            ))}
          <button
            style={{ cursor: "pointer" }}
            onClick={onClose}
            className={styles.closebtn}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default IndivChatModal;
