import React, { useState } from "react";
import styles from "./TaskModal.module.css";
import { getTaskGroupDetail } from "../../utils/taskGroupApi";

interface TaskModalProps {
  closeModal: () => void;
  taskId: string | number;
}

function TaskModal({ closeModal, taskId }: TaskModalProps) {
  const [teamTaskDetail, setTeamTaskDetail] = useState({});

  const getTeamTask = async () => {
    try {
      const response = await getTaskGroupDetail(taskId);
      console.log(response.data.result[0]);
      setTeamTaskDetail(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{taskId}</p>

        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default TaskModal;
