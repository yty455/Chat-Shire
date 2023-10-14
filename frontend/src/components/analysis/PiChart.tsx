import React from 'react'
import { ResponsivePie } from '@nivo/pie'

import { useRecoilState } from 'recoil'
import { morningCount_recoil, afternoonCount_recoil, nightCount_recoil, workStyleColor_recoil } from '../../stores/atom'

const PiChart = () => {
  const [workStyleColor, setWorkStyleColor] = useRecoilState(workStyleColor_recoil)
  const [morningCommit, setMorningCommit] = useRecoilState(morningCount_recoil)
  const [afternoonCommit, setAfternoonCommit] = useRecoilState(afternoonCount_recoil)
  const [nightCommit, setNightCommit] = useRecoilState(nightCount_recoil)

  const data = [
    {
      "id": "오전",
      "label": "오전",
      "value": morningCommit,
    },
    {
      "id": "오후",
      "label": "오후",
      "value": afternoonCommit,
    },
    {
      "id": "새벽",
      "label": "새벽",
      "value": nightCommit,
    }
  ]

  const PiChartColor = () => {
    if (morningCommit >= afternoonCommit && morningCommit >= nightCommit) {
        return [workStyleColor.main, "#cfcfcf", "#cfcfcf"]
    } else if (afternoonCommit > morningCommit && afternoonCommit >= nightCommit) {
        return ["#cfcfcf", workStyleColor.main, "#cfcfcf"]
    } else if (nightCommit > afternoonCommit) {
        return ["#cfcfcf", "#cfcfcf", workStyleColor.main]
    }
  }

  return (
    <ResponsivePie
        data={data}
        margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
        sortByValue={true}
        innerRadius={0.8}
        padAngle={2}
        cornerRadius={3}
        fit={false}
        activeOuterRadiusOffset={0}
        colors={PiChartColor()}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        legends={[]}
    />
  )
}

export default PiChart;