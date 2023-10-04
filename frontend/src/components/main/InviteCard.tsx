import React from "react";
import styles from "./invite.module.css";
import { IconButton } from "@mui/material";
import { BsFillCheckCircleFill, BsXCircle } from "react-icons/bs";

interface InviteCardProps {
  invite: {
    chatRoomName: string;
    host: string;
    id: string;
  };
  acceptInvitation: (invitationId: string) => void;
  rejectInvitation: (invitationId: string) => void;
}

const InviteCard: React.FC<InviteCardProps> = ({
  invite,
  acceptInvitation,
  rejectInvitation,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmInvitation = () => {
    const userResponse = window.confirm("프로젝트에 참여하시겠어요?");
    if (userResponse) {
      // 사용자가 "확인"을 누르면 acceptInvitation 함수 호출
      acceptInvitation(invite.id);
    }
  };

  const ignoreInvitation = () => {
    const userResponse = window.confirm("초대를 거절 하시겠어요?");
    if (userResponse) {
      // 사용자가 "확인"을 누르면 rejectInvitation 함수 호출
      rejectInvitation(invite.id);
    }
  };

  return (
    <div className={styles.InviteItemContainer}>
      <div className={styles.InviteItem}>
        <div className={styles.InviteItemTitle}>
          <span style={{ fontSize: "18px", marginBottom: "2px" }}>
            CHAT-SHIRE{invite.chatRoomName}
          </span>
          <span>초대한 사람 : {invite.host}</span>
        </div>
        <div style={{ marginRight: "10px" }}>
          <BsFillCheckCircleFill
            size={30}
            color="#39A789"
            style={{ marginRight: "8px", cursor: "pointer" }}
            onClick={confirmInvitation}
          />
          <BsXCircle
            size={30}
            color="#39A789"
            style={{ cursor: "pointer" }}
            onClick={ignoreInvitation}
          />
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
