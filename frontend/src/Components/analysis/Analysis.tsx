import React from 'react'
import styles from './Analysis.module.css'
import RadarChart from './RadarChart'
import BarChart from './BarChart'
import PiChart from './PiChart'

export default function Analysis() {
  return (
    <div className={styles.analysisContainer}>
      <div className={styles.analysisHeader}>
        <div className={styles.analysisTopicsContainer}>
          <span className={styles.analysisItemTitle}>
            프로젝트 주제
          </span>
        </div>
        <div className={styles.analysisPiGraphContainer}>
          <span className={styles.analysisItemTitle}>
            밤에 안자고 뭐하니?
          </span>
          <div className={styles.analysisCharts}>
            <div className={styles.analysisPiChart}>
              <PiChart/>
            </div>
            <div className={styles.analysisBarChart}>
              <BarChart/>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.analysisBody}>
        <div className={styles.analysisRadarContainer}>
          <span className={styles.analysisItemTitle}>
            TEAM 오잉
          </span>
          <RadarChart/>
        </div>
      </div>
      <div className={styles.analysisFooter}>
        <div className={styles.analysisWordCloudContainer}>
          <span className={styles.analysisItemTitle}>
            오잉의 관심사는 뭐에요?
          </span>
        </div>
        <div className={styles.analysisInfoContainer}>
          <span className={styles.analysisItemTitle}>
            프로젝트 작업 기간
          </span>
        </div>
      </div>
    </div>
  )
}
