import React from "react";
import styles from "./invite.module.css";
import { IconButton } from "@mui/material";
import {BsFillCheckCircleFill, BsXCircle} from 'react-icons/bs'

interface InviteCardProps {
  invite: {
    pjt: string;
    people: string;
  };
}

const InviteCard: React.FC<InviteCardProps> = ({ invite }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmInvitation = () => {
    alert("프로젝트에 참여하시겠어요?")
  }

  const ignoreInvitation = () => {
    alert("초대를 거절 하시겠어요?")
  }

  return (
    <div className={styles.InviteItemContainer}>
      <div className={styles.InviteItem}>
        <div className={styles.InviteItemTitle}>
          <span style={{fontSize: "18px", marginBottom: "2px"}}>
            CHAT-SHIRE{invite.pjt}
          </span>
          <span>
            초대한 사람 : {invite.people}
           </span>
        </div>
        <div style={{marginRight: "10px"}}>
          <BsFillCheckCircleFill size={30} color="#39A789" style={{marginRight: "8px", cursor: "pointer"}} onClick={confirmInvitation}/>
          <BsXCircle size={30} color="#39A789" style={{cursor: "pointer"}} onClick={ignoreInvitation}/>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
