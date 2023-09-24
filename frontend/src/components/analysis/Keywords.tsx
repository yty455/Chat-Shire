import React from "react";
import styles from "./Keywords.module.css";
import { AnyARecord } from "dns";

export default function Keywords(topic: any) {
  return <div className={styles.keywordsContainer}>{topic}</div>;
}
