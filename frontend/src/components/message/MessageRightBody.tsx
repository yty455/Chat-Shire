import React from "react";
import styles from "./MessageRightBody.module.css";
import RightMediaTab from "./RightMediaTab";
import RightFileTab from "./RightFileTab";
import RightSearchTab from "./RightSearchTab";
import RightLinkTab from "./RightLinkTab";

interface Props {
  value: string;
  projectId: string;
  files:{ url: string; name: string; size: number }[]
  images : string[];
  videos : string[];
}

const MessageRightBody: React.FC<Props> = ({ value, projectId, files, images, videos }) => {
  if (value === "media") {
    return <RightMediaTab projectId={projectId} images={images} videos={videos}/>;
  } else if (value === "files") {
    return <RightFileTab projectId={projectId} files={files} />;
  } else if (value === "links") {
    return <RightLinkTab projectId={projectId} />;
  } else if (value === "search") {
    return <RightSearchTab />;
  } else {
    return <span>Loading...</span>;
  }
};

export default MessageRightBody;
