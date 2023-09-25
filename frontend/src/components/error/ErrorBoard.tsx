import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Search from "./Search";
import Container from "../common/Container";
import MultiSelect from "./MultiSelect";
// import styles from "./Idea.module.css";
import ErrorList from "./ErrorList";
import "./Error.css";
import styles from "./Error.module.css";
import ErrorModal from "./ErrortModal";
import { EditOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

interface ErrorProps {
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

function Error({ isCreating, setIsCreating }: ErrorProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedError, setSelectedError] = useState<any>(null);

  const handleErrorCardClick = (pjt: any) => {
    setSelectedError(pjt);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateClick = () => {
    setIsCreating(true); // isCreating 상태를 true로 변경
  }

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
      {!isCreating && (
        <FloatButton 
          icon={<EditOutlined />} 
          type="primary" 
          style={{ width: '50px', height: '50px', bottom:85, right:75 }} 
          onClick={handleCreateClick}
        />
      )}
    </div>
  );
}

export default Error;
