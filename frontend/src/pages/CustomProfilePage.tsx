import React from 'react'
import CustomProfile from '../components/profileSetting/CustomProfile'
import CustomProfileInfo from '../components/profileSetting/CustomProfileInfo'

export default function CustomProfilePage() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#F7F7F7",}}
    >
      <CustomProfile/>
      <CustomProfileInfo/>
    </div>
  )
}
