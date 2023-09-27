import React, { useEffect, useState } from "react";
import styles from "./IndivChatModal.module.css";
import { getReferences } from "../../utils/taskReferenceApi";

interface IndivChatModalProps {
  onClose: () => void;
  taskId: any;
}

function IndivChatModal({ taskId, onClose }: IndivChatModalProps) {
  const [taskChat, setTaskChat] = useState({});
  const getTaskChat = async () => {
    try {
      const response = await getReferences(taskId);
      console.log(response.data.result[0]);
      setTaskChat(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskChat();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      123
      <button onClick={onClose}> 닫기 </button>
    </div>
  );
}

export default IndivChatModal;
