import React from 'react'
import styles from './ProfilePage.module.css'
import ProfileLarge from '../components/profile/ProfileLarge'
import LeftSideTab from '../components/common/LeftSideTab'
import RadarChart from '../components/analysis/RadarChart'
import BarChart from '../components/analysis/BarChart'

export default function ProfilePage() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", backgroundColor: "#F7F7F7"}}>
      <LeftSideTab/>
      <div style={{display: "flex", flexDirection: "column", width: "1080px", height: "630px", padding: "30px", borderRadius: "36px", backgroundColor: "#ffffff"}}>
        <div className={styles.profileHeader}>
          <ProfileLarge/>
          <div className={styles.profileHeaderDesc}>
            <div className={styles.profileHeaderLeft}>
              <span className={styles.profileName}>김구현 FE</span>
              <div className={styles.profileCareer}>
                <span>깃헙</span>
                <span>깃헙</span>
                <span>깃헙</span>
              </div>
              <div className={styles.profileIntro}>
                <span>안녕하세요 제 이름은 김구현이고 어쩌고 저쩌고</span>
              </div>
            </div>
            <div className={styles.profileHeaderRight}>
              <div className={styles.profileRadarContainer}>
                <RadarChart/>
              </div>
              <div className={styles.profileBarContainer}>
                <BarChart/>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.profileBodyTitle}>
            <span style={{color: "#575757", fontSize: "34px"}}>Achievement </span>
            <span style={{color: "#575757", fontSize: "20px"}}>8/60</span>
          </div>
        </div>
      </div>
    </div>
  )
}
