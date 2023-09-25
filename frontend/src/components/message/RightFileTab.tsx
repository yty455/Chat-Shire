import React from 'react'
import styles from './RightFileTab.module.css'

import { BsMusicNoteBeamed, BsCameraVideoFill, BsFillFileTextFill } from 'react-icons/bs'
import { CardActionArea } from '@mui/material';

export default function RightFileTab() {
  return (
    <div className={styles.MessageRightBody}>
      <span className={styles.MessageRightBodyTitle}>
        파일
      </span>
      <div className={styles.MessageFileStorage}>
        <div className={styles.fileThumbnail}>
          <CardActionArea style={{height: "144px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "10px"}}>
            <div className={styles.fileThumbnailHeader}>
              <BsMusicNoteBeamed size={24}/>
              <span className={styles.fileName}>
                music.m4a
              </span>
            </div>
            <span>
              94.72KB
            </span>
          </CardActionArea>
        </div>
        <div className={styles.fileThumbnail}>
          <CardActionArea style={{height: "120px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "10px"}}>
            <div className={styles.fileThumbnailHeader}>
              <BsCameraVideoFill size={24}/>
              <span className={styles.fileName}>
                video.mp4
              </span>
            </div>
            <span>
              94.72KB
            </span>
          </CardActionArea>
        </div>
        <div className={styles.fileThumbnail}>
          <CardActionArea style={{height: "120px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "10px"}}>
            <div className={styles.fileThumbnailHeader}>
              <BsFillFileTextFill size={24}/>
              <span className={styles.fileName}>
                file.txt
              </span>
            </div>
            <span>
              94.72KB
            </span>
          </CardActionArea>
        </div>
      </div>
    </div>
  )
}
