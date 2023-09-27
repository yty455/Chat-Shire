import React, { useEffect, useState } from "react";
import styles from "./IndivChatModal.module.css";
import { getReferences } from "../../utils/taskReferenceApi";

interface IndivChatModalProps {
  onClose: () => void;
  taskId: any;
}
interface ChatItem {
  nickname: string;
  content: string;
  chatTime: string;
  chatNumber: number;
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
  function formatChatTime(chatTime: any) {
    const date = new Date(chatTime);
    return date.toLocaleString(); // 브라우저 설정에 따라 로케일에 맞게 날짜 및 시간을 표시
  }

  useEffect(() => {
    getTaskChat();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      {taskChat &&
        taskChat.map((chat) => (
          <div key={chat.chatNumber}>
            {" "}
            <p>{chat.nickname}</p>
            <p>{chat.content}</p>
            <p>{formatChatTime(chat.chatTime)}</p>
          </div>
        ))}
      <button onClick={onClose}> 닫기 </button>
    </div>
  );
}

export default IndivChatModal;
