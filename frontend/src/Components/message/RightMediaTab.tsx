import React from 'react'
import styles from './RightMediaTab.module.css'

export default function RightMediaTab() {
  return (
    <div className={styles.MessageRightBody}>
      <span className={styles.MessageRightBodyTitle}>
        미디어
      </span>
      <div className={styles.MessageRightMediaStorage}>
        <span className={styles.MediaStorageTitle}>
          사진 보관함
        </span>
        <div className={styles.MediaContainer}>
          <div className={styles.photoThumbnail}>PHOTO</div>
          <div className={styles.photoThumbnail}>PHOTO</div>
          <div className={styles.photoThumbnail}>PHOTO</div>
        </div>
      </div>
      <div className={styles.MessageRightMediaStorage}>
        <span className={styles.MediaStorageTitle}>
          동영상 보관함
        </span>
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
