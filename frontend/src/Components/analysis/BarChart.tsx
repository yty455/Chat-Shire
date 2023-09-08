import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { deflate } from 'zlib'

const BarChart = () => {
  const data = [
    {
      "country": "AD",
      "hot dog": 85,
      "hot dogColor": "hsl(217, 70%, 50%)",
      "burger": 3,
      "burgerColor": "hsl(80, 70%, 50%)",
      "sandwich": 91,
      "sandwichColor": "hsl(211, 70%, 50%)",
      "kebab": 194,
      "kebabColor": "hsl(57, 70%, 50%)",
      "fries": 131,
      "friesColor": "hsl(123, 70%, 50%)",
      "donut": 128,
      "donutColor": "hsl(9, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 175,
      "hot dogColor": "hsl(74, 70%, 50%)",
      "burger": 77,
      "burgerColor": "hsl(244, 70%, 50%)",
      "sandwich": 31,
      "sandwichColor": "hsl(262, 70%, 50%)",
      "kebab": 181,
      "kebabColor": "hsl(26, 70%, 50%)",
      "fries": 98,
      "friesColor": "hsl(47, 70%, 50%)",
      "donut": 53,
      "donutColor": "hsl(4, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 81,
      "hot dogColor": "hsl(359, 70%, 50%)",
      "burger": 77,
      "burgerColor": "hsl(292, 70%, 50%)",
      "sandwich": 34,
      "sandwichColor": "hsl(172, 70%, 50%)",
      "kebab": 141,
      "kebabColor": "hsl(126, 70%, 50%)",
      "fries": 143,
      "friesColor": "hsl(161, 70%, 50%)",
      "donut": 197,
      "donutColor": "hsl(284, 70%, 50%)"
    },
  ]

  return (
      <ResponsiveBar
          data={data}
          keys={[
              'hot dog',
          ]}
          indexBy="country"
          margin={{ top: 14, right: 20, bottom: 40, left: 4 }}
          padding={0.5}
          groupMode="grouped"
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'set1' }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'fries'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'sandwich'
                  },
                  id: 'lines'
              }
          ]}
          borderRadius={6}
          borderWidth={1}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'opacity',
                      2.3
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridY={false}
          labelSkipWidth={14}
          labelSkipHeight={12}
          labelTextColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          legends={[]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      />
  )
}

export default BarChart;