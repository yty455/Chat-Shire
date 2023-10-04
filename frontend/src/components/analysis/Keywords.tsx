import React, { useState, useEffect } from "react";
import styles from "./Keywords.module.css";
import { AnyARecord } from "dns";

import api from '../../utils/api'

interface KeywordsProps {
  topic?: string;
  projectId: number;
  isSelected: boolean;
}

export default function Keywords({ topic, projectId, isSelected }: KeywordsProps) {

  const registerProjectTopic = () => {
    if (isSelected) {
      api.delete(`/projects/${projectId}/keywords`,{data: {"words": [topic]}})
      .then(res => console.log(res))
    } else {
      api.post(`/projects/${projectId}/keywords`, {"words": [topic]})
      .then(res => console.log(res))
    }
  }

  return <div className={styles.keywordsContainer} onClick={registerProjectTopic}>{topic}</div>;
}
