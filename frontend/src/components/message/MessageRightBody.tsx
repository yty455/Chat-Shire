import React from "react";
import styles from "./MessageRightBody.module.css";
import RightMediaTab from "./RightMediaTab";
import RightFileTab from "./RightFileTab";
import RightSearchTab from "./RightSearchTab";
import RightLinkTab from "./RightLinkTab";

interface Props {
  value: string;
  projectId: string;
}

const MessageRightBody: React.FC<Props> = ({ value, projectId }) => {
  if (value === "media") {
    return <RightMediaTab projectId={projectId} />;
  } else if (value === "files") {
    return <RightFileTab projectId={projectId} />;
  } else if (value === "links") {
    return <RightLinkTab projectId={projectId} />;
  } else if (value === "search") {
    return <RightSearchTab />;
  } else {
    return <span>Loading...</span>;
  }
};

export default MessageRightBody;
