import React from "react";
import { useRecoilState } from "recoil";
import Search from "./Search";
import Container from "../common/Container";
import MultiSelect from "./MultiSelect";
// import styles from "./Idea.module.css";
import ErrorList from "./ErrorList";
import './Error.css'
import styles from './Error.module.css'

function Error() {
  return (
    <div className={styles.ErrorBoardContainer}>
      <div
        style={{
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MultiSelect />
        <Search />
      </div>
      <ErrorList />
    </div>
  );
}

export default Error;
