import React, {useState} from 'react'
import styles from './RightLinkTab.module.css'
import LinkOGItem from './LinkOGItem';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import ModalComponent from './CreateLinkModal';
import { Button } from 'antd';

export default function RightLinkTab() {
  const [isModalVisible,setIsModalVisible] = useState(false);

  const showModal=()=>{
   setIsModalVisible(true)
  }
  return (
    <div className={styles.MessageRightBody}>
      <div style={{display: 'flex', alignItems:'center'}}>
        <span className={styles.MessageRightBodyTitle}>
          링크
        </span>
        <BsFillPlusCircleFill onClick={showModal} style={{marginLeft:'5px', fontSize:'20px',color: 'grey'}}/>
      </div>
      <div className={styles.BookMarkContainer}>
        <LinkOGItem/>
        <LinkOGItem/>
        <LinkOGItem/>
        <LinkOGItem/>
      </div>

      <ModalComponent open ={isModalVisible} setOpen ={setIsModalVisible}/>
    </div>
  )
}
