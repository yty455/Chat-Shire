import React from 'react'
import Analysis from '../components/analysis/Analysis'
import passion from '../assets/passion.png'

export default function AnalysisPage() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", backgroundImage: `url(${passion})`, backgroundSize: "cover"}}>
      <Analysis/>
    </div>
  )
}
