import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'

const RadarChart = () => {
    const data = [
        {
            "skill": "에러 해결사",
            "chardonay": 112,
        },
        {
            "skill": "개발",
            "chardonay": 86,
            "syrah": 61
        },
        {
            "skill": "규칙",
            "chardonay": 88,
        },
        {
            "skill": "긍정",
            "chardonay": 63,
        },
        {
            "skill": "해피",
            "chardonay": 117,
        }
    ]
  return (
    <ResponsiveRadar
        theme={{ fontFamily: 'preLt', fontSize: 18, textColor: '#ffffff'}}
        data={data}
        keys={[ 'chardonay' ]}
        indexBy="skill"
        valueFormat=" >-.2f"
        margin={{ top: 40, right: 40, bottom: 40, left: 80 }}
        borderWidth={0}
        borderColor={{ from: 'color', modifiers: [] }}
        gridLevels={3}
        gridLabelOffset={24}
        enableDots={false}
        dotSize={2}
        dotColor={{ theme: 'background' }}
        dotLabelYOffset={-14}
        colors={['#EB9042' ]}
        fillOpacity={0.8}
        blendMode="normal"
        motionConfig="default"
    />
  )
}

export default RadarChart;