import React, { useState, useEffect } from "react";
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
import { EditOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import {
  getErrors,
  searchErrConent,
  searchErrSkillName,
} from "../../utils/errorApi";
import { err_recoil } from "../../stores/atom";


interface ErrorProps {
  pjtId: string;
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

function Error({ pjtId, isCreating, setIsCreating }: ErrorProps) {
  const [openModal, setOpenModal] = useState(false);
  const [allErrors, setAllErrors] = useRecoilState(err_recoil);
  const [skillErrors, setSkillErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);
  const [selectedError, setSelectedError] = useState<any>(null);
  const [isSearch, setIsSearch] = useState(false);
  

  const handleErrorCardClick = (err: any) => {
    setSelectedError(err);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateClick = () => {
    setIsCreating(true); // isCreating 상태를 true로 변경
  };

  // 에러 불러오기
  const getInErrors = async () => {
    try {
      if (pjtId) {
        const response = await getErrors(pjtId);
        setAllErrors(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 기술 에러 검색
  const searcgskillErrors = async (skill: string) => {
    try {
      if (pjtId) {
        const response = await searchErrSkillName(pjtId, skill);
        setSkillErrors(response.data.result[0] || []); // 결과가 없는 경우 빈 배열로 설정
        setContentErrors([]); // 내용 에러 목록 비우기
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 내용 에러 검색
  const searchcontentErrors = async (content: string) => {
    try {
      if (pjtId) {
        const response = await searchErrConent(pjtId, content);
        setContentErrors(response.data.result[0] || []); // 결과가 없는 경우 빈 배열로 설정
        setSkillErrors([]); // 기술 에러 목록 비우기
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (searchText: string) => {
    if (searchText===undefined) {
      setSkillErrors([]);
      setContentErrors([]);
      setIsSearch(false)
       return
    }
    console.log("검색어:", searchText);
    searchcontentErrors(searchText);
    setIsSearch(true)
  };

  const handleSearch1 = async (searchText: string) => {
    if (searchText==="") {
      setSkillErrors([]);
      setContentErrors([]);
      setIsSearch(false)
      return
    }
    console.log("검색어:", searchText);
    searcgskillErrors(searchText);
    setIsSearch(true)
  };

  useEffect(() => {
    getInErrors();
  }, [pjtId]);

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
        <MultiSelect onSearch={handleSearch1} />
        <Search onSearch={handleSearch} />
      </div>
      <ErrorList
        onErrorCardClick={handleErrorCardClick}
        errors={
          isSearch
            ? skillErrors.length > 0
              ? skillErrors
              : contentErrors.length > 0
              ? contentErrors
              : null
            : allErrors // 검색을 하지 않은 경우에는 전체 에러 목록을 렌더링
        }
      />


      {openModal && (
        <ErrorModal
          pjtId={pjtId}
          closeModal={handleCloseModal}
          err={selectedError}
        />
      )}
      {!isCreating && (
        <FloatButton
          icon={<EditOutlined />}
          type="primary"
          style={{ width: "50px", height: "50px", bottom: 85, right: 75 }}
          onClick={handleCreateClick}
        />
      )}
    </div>
  );
}

export default Error;
