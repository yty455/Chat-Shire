import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styles from "./Share.module.css";
import IndivTask from "../common2/IndivTask"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LinkOGItem from '../message/LinkOGItem';
import ModalComponent from '../message/CreateLinkModal';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: '110px'
}));

export default function Share() {
  const [isModalVisible,setIsModalVisible] = useState(false);

  const showModal=()=>{
    setIsModalVisible(true)
  }

  return (
  <div className={styles.indivDiv}>
      {/* <h2 style={{marginLeft:'10px',fontFamily:'preBd',margin: '0', textAlign:'center',alignItems:'center',display:'flex', justifyContent:'center'}}>자료공유</h2> */}
    <Box sx={{p:0,}}>
      <LinkOGItem/>
      <LinkOGItem/>
      <LinkOGItem/>
      <LinkOGItem/>
      <LinkOGItem/>
      <LinkOGItem/>
      <LinkOGItem/>
      <LinkOGItem/>
    </Box>

    <Fab sx={{ mt: '15px', mb: '20px', mr: 'auto', ml: 'auto', display:'flex',justifyContent:'center' }} color="greenary" aria-label="add" onClick={showModal}>
    <AddIcon/>
    </Fab>

    <ModalComponent open ={isModalVisible} setOpen ={setIsModalVisible}/>
  </div>  
  );
  }