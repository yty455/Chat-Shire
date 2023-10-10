import React, {useEffect, useState} from 'react'
import styles from './RightMediaTab.module.css'
import GoogleSearch from './GoogleSearch'
import AWS from "aws-sdk";
import {AiOutlineDownload} from "react-icons/ai";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface MessageProps {
  projectId: string;
  images:string[];
  videos:string[];
}

export default function RightMediaTab({ projectId, images, videos }: MessageProps) {
  // const [images, setImages] = useState<string[]>([]);
  // const [videos, setVideos] = useState<string[]>([]);

  // useEffect(() => {
  // listImages().then(urls => setImages(urls));
  // }, []);

  // useEffect(() => {
  //   listVideos().then(urls => setVideos(urls));
  //   }, [])

  // const listImages = (): Promise<string[]> => {
  //   return new Promise((resolve, reject) => {
  //     const REGION = process.env.REACT_APP_REGION;
  //     const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
  //     const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  
  //     AWS.config.update({
  //       region: REGION,
  //       accessKeyId: ACCESS_KEY_ID,
  //       secretAccessKey: SECRET_ACCESS_KEY,
  //     });
  
  //     var params = {
  //       Bucket: "chat-shire",
  //       Prefix: `chat/media/${projectId}/`
  //     };
  
  //     var s3 = new AWS.S3();
      
  //     s3.listObjects(params, function(err, data) {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       } else { 
  //         // console.log(data);    
          
  //         if (data.Contents) {
  //           let imageUrls = data.Contents.map((file:any) => {
  //             let fileExt = file.Key.split(".").pop()?.toLowerCase();
          
  //             if (["jpeg", "jpg", "png", "JPG", "PNG", "JPEG"].includes(fileExt)) {
  //               return s3.getSignedUrl('getObject', {Bucket:"chat-shire", Key: file.Key});
  //             } else {
  //               return null;
  //             }
  //           })
  //           .filter(url => url !== null) as string[]; 
          
  //           resolve(imageUrls);
  //         } else {
  //           resolve([]);
  //         }
  //       }
  //     });
  //    });
  //  }

  //  const listVideos = (): Promise<string[]> => {
  //   return new Promise((resolve, reject) => {
  //     const REGION = process.env.REACT_APP_REGION;
  //     const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
  //     const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  
  //     AWS.config.update({
  //       region: REGION,
  //       accessKeyId: ACCESS_KEY_ID,
  //       secretAccessKey: SECRET_ACCESS_KEY,
  //     });
  
  //     var params = {
  //       Bucket: "chat-shire",
  //       Prefix: `chat/media/${projectId}/`
  //     };
  
  //     var s3 = new AWS.S3();
      
  //     s3.listObjects(params, function(err, data) {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       } else { 
  //         // console.log(data);    
          
  //         if (data.Contents) {
  //           let videoUrls = data.Contents.map((file:any) => {
  //             let fileExt = file.Key.split(".").pop()?.toLowerCase();
          
  //             if (["mp4", "MP4"].includes(fileExt)) {
  //               return s3.getSignedUrl('getObject', {Bucket:"chat-shire", Key: file.Key});
  //             } else {
  //               return null;
  //             }
  //           })
  //           .filter(url => url !== null) as string[]; 
          
  //           resolve(videoUrls);
  //         } else {
  //           resolve([]);
  //         }
  //       }
  //     });
  //    });
  //  }

  return (
    <div className={styles.MessageRightBody}>
      {/* <span style={{ marginBottom: "20px"}} className={styles.MessageRightBodyTitle}>
        미디어
      </span> */}
      <span className={styles.MediaStorageTitle}>
          사진 보관함
      </span>
      <div style={{marginBottom: "20px"}} className={styles.MessageRightMediaStorage}>
        {/* <div className={styles.MediaContainer}> */}
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={6}
          className={styles.MediaContainer}
        >
          {images.length !== 0 ? images.map((url, index) => (
            <SwiperSlide className={styles.imgContainer} key={index}>
              <img className={styles.photoThumbnail} src={url} alt="from S3" />
              <div className={styles.hoverOverlay}>
                <AiOutlineDownload onClick={() => window.open(url, "_blank")} className={styles.downButton}/>
              </div>
            </SwiperSlide>
          )) : (
            <p className={styles.noPhoto}>업로드 된 사진이 없습니다.</p>
          )}
        </Swiper>
        {/* </div> */}
      </div>
      <span className={styles.MediaStorageTitle}>
        동영상 보관함
      </span>
      <div className={styles.MessageRightMediaStorage}>
        <div className={styles.MediaContainer}>
          {videos.length !== 0 ? videos.map((url, index) => (
            <video className={styles.videoThumbnail} controls width="250" key={index} src={url}/>
          )) : (
            <p className={styles.noPhoto}>업로드 된 동영상이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  )
}
