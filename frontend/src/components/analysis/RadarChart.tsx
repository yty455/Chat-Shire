import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

import { useRecoilState } from "recoil";
import {
  keywords_recoil,
  morningCount_recoil,
  afternoonCount_recoil,
  nightCount_recoil,
  issueCount_recoil,
  allCategoryCount_recoil,
  taskCount_recoil,
  workStyleColor_recoil,
} from "../../stores/atom";

const RadarChart = () => {
  const [workStyleColor, setWorkStyleColor] = useRecoilState(
    workStyleColor_recoil
  );
  const [keywords, setKeywords] = useRecoilState(keywords_recoil);
  const [morningCommit, setMorningCommit] = useRecoilState(morningCount_recoil);
  const [afternoonCommit, setAfternoonCommit] = useRecoilState(
    afternoonCount_recoil
  );
  const [nightCommit, setNightCommit] = useRecoilState(nightCount_recoil);
  const [issueCount, setIssueCount] = useRecoilState(issueCount_recoil);
  const [allCategoryCount, setAllCategoryCount] = useRecoilState(
    allCategoryCount_recoil
  );
  const [taskCount, setTaskCount] = useRecoilState(taskCount_recoil);
  interface MyObject {
    [key: string]: number;
  }

  function totalChatCount(obj: MyObject): number {
    let sum = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        sum += obj[key];
      }
    }
    return sum;
  }

  function relevantChatCount(obj: MyObject): number {
    let sum = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && keywords.includes(key)) {
        sum += obj[key];
      }
    }
    return sum;
  }

  //   let maxValue = Math.max(
  //     morningCommit + afternoonCommit + nightCommit,
  //     issueCount,
  //     totalChatCount(allCategoryCount),
  //     relevantChatCount(allCategoryCount),
  //     taskCount
  //   );

  function minMaxScaling(num: number): number {
    let minVal = Math.min(
      morningCommit + afternoonCommit + nightCommit,
      issueCount,
      totalChatCount(allCategoryCount),
      relevantChatCount(allCategoryCount),
      taskCount
    );
    let maxVal = Math.max(
      morningCommit + afternoonCommit + nightCommit,
      issueCount,
      totalChatCount(allCategoryCount),
      relevantChatCount(allCategoryCount),
      taskCount
    );
    return (num - minVal) / (maxVal - minVal);
  }

  const data = [
    {
      skill: "개발",
      chardonay: minMaxScaling(morningCommit + afternoonCommit + nightCommit),
      //   morningCommit + afternoonCommit + nightCommit,
    },
    {
      skill: "디버깅",
      chardonay: minMaxScaling(issueCount),
      //   issueCount,
      //   minMaxScaling(issueCount + maxValue * 0.3),
    },
    {
      skill: "분위기 메이커",
      chardonay: minMaxScaling(totalChatCount(allCategoryCount)),
      //   totalChatCount(allCategoryCount),
      //   minMaxScaling(
      //     totalChatCount(allCategoryCount) + maxValue * 0.3
      //   ),
    },
    {
      skill: "협업 의지",
      chardonay: minMaxScaling(relevantChatCount(allCategoryCount)),
      //   relevantChatCount(allCategoryCount),
    },
    {
      skill: "일정 관리",
      chardonay: minMaxScaling(taskCount),
      //   taskCount,
      //   minMaxScaling(taskCount + maxValue * 0.3),
    },
  ];

  return (
    <div>
      <ResponsiveRadar
        theme={{ fontFamily: "preLt", fontSize: 18, textColor: "#ffffff" }}
        data={data}
        keys={["chardonay"]}
        indexBy="skill"
        valueFormat=" >-.2f"
        margin={{ top: 40, right: 40, bottom: 40, left: 80 }}
        borderWidth={0}
        borderColor={{ from: "color", modifiers: [] }}
        gridLevels={3}
        gridLabelOffset={24}
        enableDots={false}
        dotSize={2}
        dotColor={{ theme: "background" }}
        dotLabelYOffset={-14}
        colors={[workStyleColor.sub]}
        fillOpacity={0.6}
        blendMode="normal"
        motionConfig="default"
      />
    </div>
  );
};

export default RadarChart;
