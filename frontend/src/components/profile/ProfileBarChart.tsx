import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
// import { deflate } from 'zlib'

// import { useRecoilState } from 'recoil'
// import { workStyleColor_recoil, morningCount_recoil, afternoonCount_recoil, nightCount_recoil } from '../../stores/atom'


interface props {
    userData:any
}

const ProfileBarChart = ({userData}:props) => {
    // const [workStyleColor, setWorkStyleColor] = useRecoilState(workStyleColor_recoil)
    // const [morningCommit, setMorningCommit] = useRecoilState(morningCount_recoil)
    // const [afternoonCommit, setAfternoonCommit] = useRecoilState(afternoonCount_recoil)
    // const [nightCommit, setNightCommit] = useRecoilState(nightCount_recoil)

    const BarChartColor = () => {
        if (userData.morningCommit >= userData.afternoonCommit && userData.morningCommit >= userData.nightCommit) {
            return ["#7e7e7e", "#7e7e7e", userData.profileColor]
        } else if (userData.afternoonCommit > userData.morningCommit && userData.afternoonCommit >= userData.nightCommit) {
            return ["#7e7e7e", userData.profileColor, "#7e7e7e"]
        } else if (userData.nightCommit > userData.afternoonCommit) {
            return [userData.profileColor, "#7e7e7e", "#7e7e7e"]
        }
    }

    const data = [
        {
            "country": "새벽",
            "커밋 수": userData.nightCommit,
        },
        {
            "country": "오후",
            "커밋 수": userData.afternoonCommit,
        },
        {
            "country": "오전",
            "커밋 수": userData.morningCommit,
        },
    ]

  return (
      <ResponsiveBar
          data={data}
          keys={[
              '커밋 수',
          ]}
          indexBy="country"
          margin={{ top: 14, right: 20, bottom: 40, left: 4 }}
          padding={0.5}
          groupMode="grouped"
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={BarChartColor()}
          colorBy="indexValue"
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
          borderRadius={4}
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
      />
  )
}

export default ProfileBarChart;