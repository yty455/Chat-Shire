import React from "react";
import styles from "./Error.module.css";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import img from "../../assets/profile/m57.png";
import error from "../../assets/error.png"


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

function ErrorCard() {
  return (
    <div className={styles.errcard}>
      <div
        className="sideTabContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
        }}>
          <Avatar alt="Remy Sharp" src={img} sx={{ width: 80, height: 80 }} />
          <h5 className={styles.status}>완료</h5>
      </div>
      <div>
        <p className={styles.title}>Q. React npm no modules 에러</p>
        <h5 className={styles.language}>Python</h5>
        <img className={styles.error} alt="error" src={error}/>
        <img className={styles.error} alt="error" src={error}/>
        <img className={styles.error} alt="error" src={error}/>
        <p className={styles.answer}>A. 이렇게 함 해볼래?</p>
        <p className={styles.more}>5개의 답변 더보기</p>

      </div>
    </div>
  );
}

export default ErrorCard;
