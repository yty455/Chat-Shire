import React from "react";
import styles from "./Analysis.module.css";
import Keywords from "./Keywords";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import PiChart from "./PiChart";
import Cloud from "./Cloud";
// import Rocket from "../../assets/analysisBg/passion/passion3.png";

export default function Analysis() {

  const bgImg = process.env.PUBLIC_URL + '/assets/analysisBg/passion/passion2.png'

  return (
    <div className={styles.analysisContainer} style={{backgroundImage: `${bgImg}`}}>
      <div className={styles.analysisHeader}>
        <img
          style={{
            position: "absolute",
            left: "23vw",
            top: "1vh",
            width: "300px",
          }}
          src={
            process.env.PUBLIC_URL + "/assets/analysisBg/passion/passion3.png"
          }
          alt=""
        />
        <div className={styles.analysisTopicsContainer}>
          <span className={styles.analysisItemTitle}>프로젝트 주제</span>
          <div className={styles.analysisKeywordsContainer}>
            <Keywords />
            <Keywords />
            <Keywords />
            <Keywords />
            <Keywords />
          </div>
        </div>
        <div className={styles.analysisPiGraphContainer}>
          <span className={styles.analysisItemTitle}>밤에 안자고 뭐하니?</span>
          <div className={styles.analysisCharts}>
            <div className={styles.analysisPiChart}>
              <PiChart />
            </div>
            <div className={styles.analysisBarChart}>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.analysisBody}>
        <div className={styles.analysisRadarContainer}>
          <RadarChart />
        </div>
        <div className={styles.analysisResult}>
          <div className={styles.analysisBodyTitle}>
            <span className={styles.analysisBodyTitleLeft}>TEAM 오잉의</span>
            <span className={styles.analysisBodyTitleRight}>워크스타일은?</span>
          </div>
          <div className={styles.analysisBodyDesc}>
            <span className={styles.analysisBodyDescUp}>앗뜨거!</span>
            <span className={styles.analysisBodyDescDown}>열정 130'C</span>
          </div>
        </div>
      </div>
      <div className={styles.analysisFooter}>
        <div className={styles.analysisWordCloudContainer}>
          <span className={styles.analysisItemTitle}>
            오잉의 관심사는 뭐에요?
          </span>
          <Cloud />
        </div>
        <div className={styles.analysisInfoContainer}>
          <span className={styles.analysisInfoTitle}>프로젝트 작업 기간</span>
          <span className={styles.analysisItemDesc}>23.08.07~23.09.17</span>
          <span className={styles.analysisInfoTitle}>참여 인원</span>
          <span className={styles.analysisItemDesc}>dang, ggu, john</span>
          <span className={styles.analysisInfoTitle}>
            우리 플젝 열심히 하고 있어용
          </span>
          <span className={styles.analysisItemDesc}>
            우리의 목표는 안싸우기!
          </span>
        </div>
      </div>
    </div>
  );
}
