import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const PiChart = () => {
  const data = [
    {
      "id": "go",
      "label": "go",
      "value": 126,
      "color": "hsl(139, 70%, 50%)"
    },
    {
      "id": "php",
      "label": "php",
      "value": 341,
      "color": "hsl(237, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 210,
      "color": "hsl(68, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 528,
      "color": "hsl(341, 70%, 50%)"
    },
    {
      "id": "elixir",
      "label": "elixir",
      "value": 144,
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
        cornerRadius={2}
        fit={false}
        activeOuterRadiusOffset={0}
        colors={{ scheme: 'reds' }}
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