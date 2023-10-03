import React from "react";
import styles from "./MessageItem.module.css";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { postTask } from "../../utils/taskApi";

export default function MessageItem(message: any) {
  // 태스크 등록
  const postInTask = async (
    chatroomId: string,
    description: string,
    progress: string
  ) => {
    try {
      const response = await postTask(chatroomId, description, progress);
      console.log(response);
      // getInTask();
    } catch (error) {
      console.error(error);
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const onClickDeleteChattingRoom = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    e.preventDefault();
    // postInTask()
    // alert("채팅방을 정말 삭제하시겠어요?");
  };

  return (
    <div className={styles.messageItemContainer}>
      <StyledBadge
        className={styles.messageItemProfile}
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt="Remy Sharp"
          src={process.env.PUBLIC_URL + "assets/profile/m57.png"}
          sx={{ width: 50, height: 50 }}
        />
      </StyledBadge>
      <div
        className={styles.messageItemBody}
        draggable="true"
        onDragStart={(e) => {
          e.dataTransfer.setData("message", message.message);
        }}
      >
        <div className={styles.messageItemName}>
          <span className={styles.messageProfileName}>
            {message && message.message.userId}
          </span>
          <span className={styles.messageTime}>
            {message && message.message.chatTime}
          </span>
        </div>
        <div
          className={styles.messageItemText}
          onContextMenu={(e) => {
            onClickDeleteChattingRoom(e);
          }}
        >
          <span>{message && message.message.content}</span>
        </div>
      </div>
    </div>
  );
}
