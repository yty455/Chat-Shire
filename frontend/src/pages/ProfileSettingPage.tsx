import React from 'react'
import ProfileSetting from '../components/profileSetting/ProfileSetting'

export default function ProfileSettingPage() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#F7F7F7",
    }}>
      <ProfileSetting/>
    </div>
  )
}
