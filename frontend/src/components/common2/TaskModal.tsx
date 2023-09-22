import React, { useState, useRef, useEffect } from "react";
import styles from "./TaskModal.module.css";
import { getTaskGroupDetail } from "../../utils/taskGroupApi";

interface TaskModalProps {
  closeModal: () => void;
  taskId: string | number;
}

function TaskModal({ closeModal, taskId }: TaskModalProps) {
  const [teamTaskDetail, setTeamTaskDetail] = useState({});
  const modalRef = useRef<HTMLDivElement | null>(null);
  const getTeamTask = async () => {
    try {
      const response = await getTaskGroupDetail(taskId);
      console.log(response.data.result[0]);
      setTeamTaskDetail(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeamTask();
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // 모달 외부를 클릭한 경우 모달을 닫음
        closeModal();
      }
    };
    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleOutsideClick);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

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
