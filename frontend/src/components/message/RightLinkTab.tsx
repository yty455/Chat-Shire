import React, {useState} from 'react'
import styles from './RightLinkTab.module.css'
import LinkOGItem from './LinkOGItem';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import ModalComponent from './CreateLinkModal';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { linkState } from '../../stores/linkState';

export default function RightLinkTab() {
  const [isModalVisible,setIsModalVisible] = useState(false);
  // const [links, setLinks] = useState<string[]>([]);
  const links = useRecoilValue(linkState);

  const showModal=()=>{
   setIsModalVisible(true)
  }

  // const addNewLink = (newLink: string) => {
  //   setLinks([...links, newLink]);
  //   setIsModalVisible(false);
  // }

  return (
    <div className={styles.MessageRightBody}>
      <div style={{display: 'flex', alignItems:'center'}}>
        {/* <span className={styles.MessageRightBodyTitle}>
          링크
        </span> */}
        <p className={styles.addLink}>링크 추가하기</p>
        <BsFillPlusCircleFill onClick={showModal} style={{marginLeft:'5px', fontSize:'20px',color: 'grey'}}/>
      </div>
      <div className={styles.BookMarkContainer}>
        {links.length !== 0 ? links.map((link,index)=>(
           <LinkOGItem key={index} requestUrl={link}/>
         )) : (
          <p className={styles.noPhoto}>등록된 링크가 없습니다.</p>
         )}
      </div>

      <ModalComponent open ={isModalVisible} setOpen ={setIsModalVisible}/>
    </div>
  )
}
