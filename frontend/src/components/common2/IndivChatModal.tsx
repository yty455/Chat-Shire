import React, { useEffect, useState } from "react";
import styles from "./IndivChatModal.module.css";
import { getReferences, deleteReferences } from "../../utils/taskReferenceApi";
import { Button } from "antd";

interface IndivChatModalProps {
  onClose: () => void;
  taskId: any;
}
interface ChatItem {
  nickname: string;
  content: string;
  chatTime: string;
  chatNumber: number;
  id: string;
}

function IndivChatModal({ taskId, onClose }: IndivChatModalProps) {
  const [taskChat, setTaskChat] = useState<ChatItem[]>([]);

  const getTaskChat = async () => {
    try {
      const response = await getReferences(taskId);
      console.log(response.data.result[0]);
      setTaskChat(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteRe = async (chatId: string) => {
    try {
      const response = await deleteReferences(taskId, chatId);
      console.log(response.data.result);
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
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        {taskChat &&
          taskChat.map((chat) => (
            <div key={chat.chatNumber} className={styles.chat}>
              {" "}
              <div className={styles.nickname}>{chat.nickname} : </div>
              <div className={styles.content}>{chat.content}</div>
              <div className={styles.chatTime}>
                {" "}
                : {formatChatTime(chat.chatTime)}
              </div>
              <button
                className={styles.deletebtn}
                style={{
                  backgroundColor: "red",
                  fontFamily: "preRg",
                  width: "30px",
                  height: "25px",
                }}
                onClick={() => deleteRe(chat.id)}
              >
                삭제
              </button>
            </div>
          ))}
        <div></div>
        <button
          style={{ cursor: "pointer" }}
          onClick={onClose}
          className={styles.closebtn}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default IndivChatModal;
