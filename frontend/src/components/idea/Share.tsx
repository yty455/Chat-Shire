import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "./Share.module.css";
import IndivTask from "../common2/IndivTask";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LinkOGItem from "../message/LinkOGItem";
import ModalComponent from "../message/CreateLinkModal";
import { linkState } from "../../stores/linkState";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "110px",
}));

interface props {
  pjtId: string;
}

export default function Share({ pjtId }: props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const links = useRecoilValue(linkState);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={styles.indivDiv}>
      {/* <h2 style={{marginLeft:'10px',fontFamily:'preBd',margin: '0', textAlign:'center',alignItems:'center',display:'flex', justifyContent:'center'}}>자료공유</h2> */}
      <Box sx={{ p: 0 }}>
        {links.length !== 0 ? (
          links.map((link, index) => (
            <LinkOGItem key={index} requestUrl={link} />
          ))
        ) : (
          <p className={styles.noPhoto}>등록된 링크가 없습니다.</p>
        )}
      </Box>

      <Fab
        sx={{
          mt: "15px",
          mb: "20px",
          mr: "auto",
          ml: "auto",
          display: "flex",
          justifyContent: "center",
        }}
        color="greenary"
        aria-label="add"
        onClick={showModal}
      >
        <AddIcon />
      </Fab>

      <ModalComponent
        pjtId={pjtId}
        open={isModalVisible}
        setOpen={setIsModalVisible}
      />
    </div>
  );
}
