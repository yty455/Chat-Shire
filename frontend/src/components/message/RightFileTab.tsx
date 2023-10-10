import React, { useEffect, useState } from "react";
import styles from "./RightFileTab.module.css";
import AWS from "aws-sdk";
import {
  BsMusicNoteBeamed,
  BsCameraVideoFill,
  BsFillFileTextFill,
} from "react-icons/bs";
import { CardActionArea } from "@mui/material";

interface MessageProps {
  projectId: string;
  files:{ url: string; name: string; size: number }[];
}

export default function RightFileTab({ projectId, files }: MessageProps) {
  // const [files, setFiles] = useState<
  //   { url: string; name: string; size: number }[]
  // >([]);

  // useEffect(() => {
  //   listFiles().then((fileInfos) => setFiles(fileInfos));
  // }, []);

  // const listFiles = (): Promise<
  //   { url: string; name: string; size: number }[]
  // > => {
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
  //       Prefix: `chat/file/${projectId}/`,
  //     };

  //     var s3 = new AWS.S3();

  //     s3.listObjects(params, function (err, data) {
  //       if (err) {
  //         console.log(err, err.stack);
  //         reject(err);
  //       } else {
  //         // console.log(data);

  //         if (data.Contents) {
  //           let files = data.Contents.map((file: any) => {
  //             let url = s3.getSignedUrl("getObject", {
  //               Bucket: "chat-shire",
  //               Key: file.Key,
  //             });
  //             let name = file.Key.split("/").pop();
  //             let size = file.Size;

  //             return { url: url, name: name, size: size };
  //           });

  //           resolve(files);
  //         } else {
  //           resolve([]);
  //         }
  //       }
  //     });
  //   });
  // };
  useEffect(()=>{

  },[files])

  return (
    <div className={styles.MessageRightBody}>
      {/* <span className={styles.MessageRightBodyTitle}>
        파일
      </span> */}
      <div className={styles.MessageFileStorage}>
        {files.length !== 0 ? (
          files.map((fileInfo, index) => (
            <div className={styles.fileThumbnail} key={index}>
              <CardActionArea
                onClick={() => window.open(fileInfo.url, "_blank")}
                style={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "10px",
                }}
              >
                <span style={{ fontFamily: "preBd" }}>{fileInfo.name}</span>
                <span style={{ fontFamily: "preLt" }}>
                  {(fileInfo.size / 1024).toFixed(2)} KB
                </span>
              </CardActionArea>
            </div>
          ))
        ) : (
          <p className={styles.noPhoto}>업로드 된 파일이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
