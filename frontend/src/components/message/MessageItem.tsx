import React, { useEffect, useState } from "react";
import styles from "./MessageItem.module.css";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

interface User {
  nickname: string;
  profileColor: string;
  profileImage: string;
  state: string;
  userId: number;
}

export default function MessageItem({
  message,
  users,
}: {
  message: any;
  users: [];
}) {
  console.log(users);
  const [user, setUser] = useState<User>({
    nickname: "",
    profileColor: "",
    profileImage: "",
    state: "",
    userId: 0,
  });

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
  useEffect(() => {
    console.log(users, 12314);
    console.log(message.message.userId, 2223);
    // if (Array.isArray(users) && users.length > 0 && message.message.userId) {
    //   // users 배열을 필터링하여 userId가 message.message.userId와 같은 항목만 선택
    //   const filteredUsers = users.filter(
    //     (user: User) => user?.userId === message?.message.userId
    //   );

    //   // 선택된 사용자 정보를 setUser에 저장
    //   if (filteredUsers.length > 0) {
    //     setUser(filteredUsers[0]); // filter 함수의 결과는 배열이므로 첫 번째 요소만 가져옵니다.
    //   }
    // }

    // console.log(user);
  }, [users]);

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
          src={
            user && user.profileImage
              ? process.env.PUBLIC_URL + user.profileImage
              : process.env.PUBLIC_URL + "/assets/profile/m57.png"
          }
          sx={{
            width: 50,
            height: 50,
            backgroundColor:
              user && user.profileColor ? user.profileColor : "transparent",
          }}
        />
      </StyledBadge>
      <div
        className={styles.messageItemBody}
        draggable="true"
        onDragStart={(e) => {
          e.dataTransfer.setData("message", message.message);
          e.dataTransfer.setData("nickname", user.nickname);
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
