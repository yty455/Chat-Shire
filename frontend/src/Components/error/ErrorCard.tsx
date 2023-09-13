import React from "react";
import styles from "./Error.module.css";

function ErrorCard() {
  return (
    <div className={styles.errcard}>
      <p>Q : 404에러 났음</p>
      <p>A : 굿</p>
    </div>
  );
}

export default ErrorCard;
