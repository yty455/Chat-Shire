import React from "react";
import styles from "./Keywords.module.css";
import { AnyARecord } from "dns";

interface KeywordsProps {
  topic?: string;
}

export default function Keywords({ topic }: KeywordsProps) {
  return <div className={styles.keywordsContainer}>{topic}</div>;
}
