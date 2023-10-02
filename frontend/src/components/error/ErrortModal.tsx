import React, { useState, useEffect } from "react";
import styles from "./ErrorModal.module.css";
import {
  getErrorDetail,
  deleteError,
  updateError,
  postErrorComent,
  deleteErrorComent,
  updateErrorComent,
} from "../../utils/errorApi";
import ProfileImgBox from "../common/ProfileImgBox";
import Avatar from "@mui/material/Avatar";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atom";

interface ErrorModalProps {
  closeModal: () => void;
  err: any;
}

function ErrorModal({ closeModal, err }: ErrorModalProps) {
  const [errDetail, setErrDetail] = useState<any>({});
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState<string>("");
  const [userData] = useRecoilState(loginuser);

  // 단일 에러 불러오기
  const getInError = async () => {
    try {
      const response = await getErrorDetail(err.id);
      console.log(response.data.result[0]);
      setErrDetail(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInError = async () => {
    try {
      const response = await deleteError(err.id);
      console.log(response.data.result);
      getInError();
    } catch (error) {
      console.error(error);
    }
  };

  const postReply = async () => {
    try {
      const response = await postErrorComent(err.id, content);
      console.log(response.data.result[0]);
      setContent(""); // 댓글을 작성하고 나서 내용 초기화
      getInError();
    } catch (error) {
      console.error(error);
    }
  };

  const updateReply = async (id: string, updatedContent: string) => {
    // updatedContent 매개변수 추가
    try {
      const response = await updateErrorComent(id, updatedContent); // updatedContent를 함수로 전달
      console.log(response.data);
      getInError();
      setEditingCommentId(null); // 수정 후 수정 모드 종료
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReply = async (id: string) => {
    try {
      const response = await deleteErrorComent(id);
      console.log(response.data);
      getInError();
    } catch (error) {
      console.error(error);
    }
  };

  // 엔터 키 입력 시 댓글 작성
  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postReply();
    }
  };

  useEffect(() => {
    getInError();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{errDetail && errDetail.title}</p>
        <div className={styles.reContainer}>
          {errDetail &&
            errDetail?.replies &&
            errDetail.replies.map((item: any) => {
              return (
                <div className={styles.rep} key={item.replyId}>
                  <Avatar
                    alt={item.nickname}
                    src={process.env.PUBLIC_URL + item.profileImage}
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: item.profileColor,
                    }}
                  />
                  {item.nickname} :{" "}
                  {userData.nickname === item.nickname ? (
                    editingCommentId === item.replyId ? (
                      <>
                        <input
                          type="text"
                          value={item.content}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            updateReply(item.replyId, editedComment)
                          }
                        >
                          저장
                        </button>
                      </>
                    ) : (
                      <>
                        {item.content}
                        <button
                          onClick={() => setEditingCommentId(item.replyId)}
                        >
                          수정
                        </button>
                        <button onClick={() => deleteReply(item.replyId)}>
                          삭제
                        </button>
                      </>
                    )
                  ) : null}
                </div>
              );
            })}
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
        </div>
        <button onClick={closeModal}>닫기</button>
        {userData.nickname === errDetail.nickname ? (
          <button onClick={deleteInError}>삭제</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ErrorModal;
