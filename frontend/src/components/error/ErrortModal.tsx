import React, { useState, useEffect } from "react";
import styles from "./ErrorModal.module.css";
import { useNavigate } from "react-router-dom";
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
import { Button } from "antd";

interface ErrorModalProps {
  pjtId: string;
  closeModal: () => void;
  err: any;
}

function ErrorModal({ pjtId, closeModal, err }: ErrorModalProps) {
  const [errDetail, setErrDetail] = useState<any>({});
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState<string>("");
  const [userData] = useRecoilState(loginuser);
  // const [attachedFileInfos, setAttachedFileInfos] = useState<any>({});
  const navigate = useNavigate();

  // 단일 에러 불러오기
  const getInError = async () => {
    try {
      const response = await getErrorDetail(err.id);
      console.log(response.data.result[0]);
      setErrDetail(response.data.result[0]);
      // setAttachedFileInfos(response.data.result[0].attachedFileInfos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInError = async () => {
    try {
      const response = await deleteError(err.id);
      console.log(response.data.result);
      closeModal();
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
        <div className={styles.deContainer}>
          <div className={styles.deContainerHeader}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <span style={{fontFamily: "preBd", fontSize: "24px"}}>Q. {errDetail && errDetail.title}</span>
              <span style={{marginLeft: "10px"}}>작성자 {errDetail.nickname}</span>
              <span style={{marginLeft: "10px", fontFamily: "preLt", fontSize: "14px" }}>
                마지막 수정일:
                {errDetail.lastModifiedDate
                  ? errDetail.lastModifiedDate.toLocaleString()
                  : "날짜 없음"}
              </span>
            </div>
            <span className={styles.status}>
              {errDetail && errDetail.state === true ? "완료" : "진행"}
            </span>
          </div>
          <div className={styles.deContentContainer}>
          <span>{errDetail.content}</span>
          </div>
          <div className={styles.errImageScrollContainer}>
            <div className={styles.errImageContainer}>
              {errDetail.attachedFileInfos && (
                errDetail.attachedFileInfos.map((info: { url: string }, index: number) => (
                  <img style={{marginRight: "16px", maxHeight: "240px", height: "240px"}} key={index} src={info.url} alt="Preview" />
                ))
              )}
            </div>
          </div>
        </div>
        <div className={styles.replyContainer}>
          <span style={{ fontFamily: "preBd", fontSize: "24px" }}>Answers. </span>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} onKeyPress={handleEnterKeyPress}/>
          <div className={styles.replyScrollContainer}>
            {errDetail &&
              errDetail?.replies &&
              errDetail.replies.map((item: any) => {
                return (
                  <div className={styles.replyItemContainer} key={item.replyId}>
                    <div className={styles.replyLeft}>
                      <Avatar
                        alt={item.nickname}
                        src={process.env.PUBLIC_URL + item.profileImage}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: item.profileColor,
                        }}
                      />
                    </div>
                    {editingCommentId === item.replyId ? (
                      <div className={styles.replyRight}>
                        <input
                          type="text"
                          value={item.content}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <button
                          onClick={() => updateReply(item.replyId, editedComment)}
                        >
                          저장
                        </button>
                      </div>
                    ) : (
                      <div className={styles.replyRight}>
                        {item.content}
                        {userData.nickname === item.nickname ? (
                          <div>
                            <button
                              onClick={() => setEditingCommentId(item.replyId)}
                            >
                              수정
                            </button>
                            <button onClick={() => deleteReply(item.replyId)}>
                              삭제
                            </button>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <button onClick={closeModal} className={styles.closebtn}>
          X
        </button>
        {userData.nickname === errDetail.nickname ? (
          <Button
            onClick={deleteInError}
            style={{ backgroundColor: "red", fontFamily: "preRg" }}
            key="submit"
            type="primary"
            className={styles.deletebtn}
          >
            삭제
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ErrorModal;
