import React from "react";
import styles from "./Error.module.css";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
// import img from "../../assets/profile/m57.png";
// import error from "../../assets/error.png";

interface ErrorCardProps {
  error?: any;
  onCardClick?: (error: any) => void;
}

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

function ErrorCard({ error, onCardClick }: ErrorCardProps) {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onCardClick?.(error);
  };

  return (
    <div className={styles.errcard} onClick={handleModalClick}>
      <div
        className="sideTabContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={
            process.env.PUBLIC_URL +
            (error ? error.profileImage : "/assets/profile/m57.png")
          }
          sx={{ width: 80, height: 80 }}
        />
        <h5 className={styles.status}>
          {error && error.state === true ? "완료" : "진행"}
        </h5>
      </div>
      <div>
        <p className={styles.title}>Q. {error ? error.title : ""}</p>
        <div className={styles.skillbox}>
          {error && Array.isArray(error.skillName) ? (
            error.skillName.map((item: any, index: number) => (
              <h5 key={index} className={styles.language}>
                {item}
              </h5>
            ))
          ) : (
            <h5 className={styles.language}>Python</h5>
          )}
        </div>
        <img
          className={styles.error}
          alt="error"
          src={process.env.PUBLIC_URL + "assets/error.png"}
        />
        <img
          className={styles.error}
          alt="error"
          src={process.env.PUBLIC_URL + "assets/error.png"}
        />
        <img
          className={styles.error}
          alt="error"
          src={process.env.PUBLIC_URL + "assets/error.png"}
        />
        <p className={styles.answer}>
          {" "}
          A. {error && error.reply ? error.reply : "이렇게 함 해볼래?"}
        </p>
        <p className={styles.more}>
          {error && error.replyCount}개의 답변 더보기
        </p>
      </div>
    </div>
  );
}

export default ErrorCard;
