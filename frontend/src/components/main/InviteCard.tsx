import React from "react";
import styles from "./invite.module.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TouchAppIcon from "@mui/icons-material/TouchApp";

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

  return (
    <div className={styles.invitebox}>
      <div className={styles.invitecard}>
        <p>
          <span> PJT {invite.pjt}: </span> {invite.people}의 초대
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <TouchAppIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>수락</MenuItem>
            <MenuItem onClick={handleClose}>거절</MenuItem>
          </Menu>
        </p>
      </div>
    </div>
  );
};

export default InviteCard;
