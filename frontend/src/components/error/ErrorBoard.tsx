import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Search from "./Search";
import Container from "../common/Container";
import MultiSelect from "./MultiSelect";
// import styles from "./Idea.module.css";
import ErrorList from "./ErrorList";
import "./Error.css";
import styles from "./Error.module.css";
import ErrorModal from "./ErrortModal";

function Error() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedError, setSelectedError] = useState<any>(null);

  const handleErrorCardClick = (pjt: any) => {
    setSelectedError(pjt);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      <ErrorList onErrorCardClick={handleErrorCardClick} />
      {openModal && <ErrorModal closeModal={handleCloseModal} />}
    </div>
  );
}

export default Error;
