import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const PiChart = () => {
  const data = [
    {
      "id": "오전",
      "label": "오전",
      "value": 20,
      "color": "hsl(68, 70%, 50%)"
    },
    {
      "id": "오후",
      "label": "오후",
      "value": 30,
      "color": "hsl(341, 70%, 50%)"
    },
    {
      "id": "새벽",
      "label": "새벽",
      "value": 88,
      "color": "hsl(33, 70%, 50%)"
    }
  ]

  return (
    <ResponsivePie
        data={data}
        margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
        sortByValue={true}
        innerRadius={0.1}
        padAngle={2}
        cornerRadius={3}
        fit={false}
        activeOuterRadiusOffset={0}
        colors={[ '#EB9042', '#EDA568', '#EFC5A0']}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.6
                ]
            ]
        }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        legends={[]}
    />
  )
}

export default PiChart;