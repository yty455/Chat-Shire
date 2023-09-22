import React, { useState, useRef, useEffect } from "react";
import styles from "./TaskModal.module.css";
import { getTaskGroupDetail } from "../../utils/taskGroupApi";

interface TaskModalProps {
  closeModal: () => void;
  taskId: string | number;
  deleteTeamTask: (taskGroupId: any) => Promise<void>;
  updateTeamTask: (taskGroupId: any, data: any) => Promise<void>;
}

interface TeamTaskDetail {
  id: string;
  name: string;
  description: string;
  priority: string;
  progress: string;
  deadline: string;
  taskInfoDetailResponses: [];
}

function TaskModal({
  closeModal,
  taskId,
  deleteTeamTask,
  updateTeamTask,
}: TaskModalProps) {
  const [teamTaskDetail, setTeamTaskDetail] = useState<TeamTaskDetail | null>(
    null
  );
  const [editingField, setEditingField] = useState<string | null>(null);
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

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const handleSaveClick = async (field: keyof TeamTaskDetail) => {
    if (teamTaskDetail) {
      const updatedData = { ...teamTaskDetail, [field]: teamTaskDetail[field] };
      await updateTeamTask(teamTaskDetail.id, updatedData);
      setEditingField(null);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div>
        {teamTaskDetail && (
          <div className={styles.modalContent}>
            <p>{taskId}</p>
            <p onClick={() => handleEditClick("name")}>
              {editingField === "name" ? (
                <input
                  type="text"
                  value={teamTaskDetail.name}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.name
              )}
            </p>
            <p onClick={() => handleEditClick("description")}>
              {editingField === "description" ? (
                <input
                  type="text"
                  value={teamTaskDetail.description}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.description
              )}
            </p>

            <p onClick={() => handleEditClick("priority")}>
              {editingField === "priority" ? (
                <input
                  type="text"
                  value={teamTaskDetail.priority}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      priority: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.priority
              )}
            </p>
            <p onClick={() => handleEditClick("progress")}>
              {editingField === "progress" ? (
                <input
                  type="text"
                  value={teamTaskDetail.progress}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      progress: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.progress
              )}
            </p>
            <p onClick={() => handleEditClick("deadline")}>
              {editingField === "deadline" ? (
                <input
                  type="text"
                  value={teamTaskDetail.deadline}
                  onChange={(e) =>
                    setTeamTaskDetail({
                      ...teamTaskDetail,
                      deadline: e.target.value,
                    })
                  }
                />
              ) : (
                teamTaskDetail.deadline
              )}
            </p>
            {editingField && (
              <button
                onClick={() => {
                  if (
                    editingField === "name" ||
                    editingField === "description" ||
                    editingField === "priority" ||
                    editingField === "progress" ||
                    editingField === "deadline"
                  ) {
                    handleSaveClick(editingField);
                  }
                }}
              >
                저장
              </button>
            )}
            <button onClick={closeModal}>닫기</button>
          </div>
        )}
        <button
          onClick={() => teamTaskDetail && deleteTeamTask(teamTaskDetail.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default TaskModal;
