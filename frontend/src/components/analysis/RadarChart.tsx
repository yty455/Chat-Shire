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

  let maxValue = Math.max(
    morningCommit + afternoonCommit + nightCommit,
    issueCount,
    totalChatCount(allCategoryCount),
    relevantChatCount(allCategoryCount),
    taskCount
  );

  function minMaxScaling(num: number): number {
    let minVal = Math.min(
      morningCommit + afternoonCommit + nightCommit + maxValue * 0.3,
      issueCount + maxValue * 0.3,
      totalChatCount(allCategoryCount) + maxValue * 0.3,
      relevantChatCount(allCategoryCount) + maxValue * 0.3,
      taskCount + maxValue * 0.3
    );
    let maxVal = Math.max(
      morningCommit + afternoonCommit + nightCommit + maxValue * 0.3,
      issueCount + maxValue * 0.3,
      totalChatCount(allCategoryCount) + maxValue * 0.3,
      relevantChatCount(allCategoryCount) + maxValue * 0.3,
      taskCount + maxValue * 0.3
    );
    return (num - minVal) / (maxVal - minVal);
  }

  const data = [
    {
      skill: "개발",
      chardonay: morningCommit + afternoonCommit + nightCommit + maxValue * 0.3,
      //   minMaxScaling(
      //     morningCommit + afternoonCommit + nightCommit + maxValue * 0.3
      //   ),

      // "chardonay": 8,
    },
    {
      skill: "디버깅",
      chardonay: issueCount + maxValue * 0.3,
      //   minMaxScaling(issueCount + maxValue * 0.3),

      // "chardonay": 7,
    },
    {
      skill: "분위기 메이커",
      chardonay: totalChatCount(allCategoryCount) + maxValue * 0.3,
      //   minMaxScaling(
      //     totalChatCount(allCategoryCount) + maxValue * 0.3
      //   ),

      // "chardonay": 10,
    },
    {
      skill: "협업 의지",
      chardonay: relevantChatCount(allCategoryCount) + maxValue * 0.3,
      //   minMaxScaling(
      //     relevantChatCount(allCategoryCount) + maxValue * 0.3
      //   ),

      // "chardonay": 7,
    },
    {
      skill: "일정 관리",
      chardonay: taskCount + maxValue * 0.3,
      //   minMaxScaling(taskCount + maxValue * 0.3),

      // "chardonay": 8,
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
