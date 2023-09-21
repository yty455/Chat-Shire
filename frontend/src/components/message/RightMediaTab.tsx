import React from 'react'
import styles from './RightMediaTab.module.css'
import GoogleSearch from './GoogleSearch'

export default function RightMediaTab() {
  return (
    <div className={styles.MessageRightBody}>
      <span style={{ marginBottom: "20px"}} className={styles.MessageRightBodyTitle}>
        미디어
      </span>
      <span className={styles.MediaStorageTitle}>
          사진 보관함
      </span>
      <div style={{marginBottom: "20px"}} className={styles.MessageRightMediaStorage}>
        <div className={styles.MediaContainer}>
          <div className={styles.photoThumbnail}>PHOTO</div>
          <div className={styles.photoThumbnail}>PHOTO</div>
          <div className={styles.photoThumbnail}>PHOTO</div>
          <div className={styles.photoThumbnail}>PHOTO</div>
        </div>
      </div>
      <span className={styles.MediaStorageTitle}>
        동영상 보관함
      </span>
      <div className={styles.MessageRightMediaStorage}>
        <div className={styles.MediaContainer}>
          <div className={styles.photoThumbnail}>
            VIDEO
          </div>
          <div className={styles.photoThumbnail}>
            VIDEO
          </div>
          <div className={styles.photoThumbnail}>
            VIDEO
          </div>
        </div>
      </div>
    </div>
  )
}
