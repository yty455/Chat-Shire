import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'

const RadarChart = () => {
    const data = [
        {
            "skill": "에러",
            "chardonay": 112,
            "carmenere": 117,
            "syrah": 83
        },
        {
            "skill": "개발",
            "chardonay": 86,
            "carmenere": 32,
            "syrah": 61
        },
        {
            "skill": "규칙",
            "chardonay": 88,
            "carmenere": 56,
            "syrah": 42
        },
        {
            "skill": "긍정",
            "chardonay": 63,
            "carmenere": 89,
            "syrah": 96
        },
        {
            "skill": "소통",
            "chardonay": 117,
            "carmenere": 92,
            "syrah": 86
        }
    ]
  return (
    <ResponsiveRadar
        data={data}
        keys={[ 'chardonay', 'carmenere', 'syrah' ]}
        indexBy="skill"
        valueFormat=" >-.2f"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        curve="catmullRomClosed"
        borderWidth={0}
        borderColor={{ from: 'color', modifiers: [] }}
        gridLevels={3}
        gridLabelOffset={24}
        enableDots={false}
        dotSize={2}
        dotColor={{ theme: 'background' }}
        dotLabelYOffset={-14}
        colors={{ scheme: 'reds' }}
        fillOpacity={1}
        blendMode="normal"
        motionConfig="default"
    />
  )
}

export default RadarChart;