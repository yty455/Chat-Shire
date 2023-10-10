import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

interface props {
  userData: any;
}

const ProfileRadarChart = ({ userData }: props) => {
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

  // function relevantChatCount(obj: MyObject): number {
  //     let sum = 0;
  //     for (let key in obj) {
  //         if (obj.hasOwnProperty(key) && keywords.includes(key)) {
  //           sum += obj[key];
  //         }
  //     }
  //     return sum;
  // }

  let maxValue = Math.max(
    userData.morningCommit + userData.afternoonCommit + userData.nightCommit,
    userData.errorCount,
    userData.chatCount,
    userData.topicCount,
    userData.taskCount
  );

  function minMaxScaling(num: number): number {
    let minVal = Math.min(
      userData.morningCommit +
        userData.afternoonCommit +
        userData.nightCommit +
        maxValue * 0.3,
      userData.errorCount + maxValue * 0.3,
      userData.chatCount + maxValue * 0.3,
      userData.topicCount + maxValue * 0.3,
      userData.taskCount + maxValue * 0.3
    );
    let maxVal = Math.max(
      userData.morningCommit +
        userData.afternoonCommit +
        userData.nightCommit +
        maxValue * 0.3,
      userData.errorCount + maxValue * 0.3,
      userData.chatCount + maxValue * 0.3,
      userData.topicCount + maxValue * 0.3,
      userData.taskCount + maxValue * 0.3
    );
    return (num - minVal) / (maxVal - minVal);
  }

  const data = [
    {
      skill: "개발",
      chardonay: minMaxScaling(
        userData.morningCommit +
          userData.afternoonCommit +
          userData.nightCommit +
          maxValue * 0.2
      ),
      // "chardonay": 8,
    },
    {
      skill: "디버깅",
      chardonay: minMaxScaling(userData.errorCount + maxValue * 0.3),
      // "chardonay": 7,
    },
    {
      skill: "분위기 메이커",
      chardonay: minMaxScaling(userData.chatCount + maxValue * 0.3),
      // "chardonay": 10,
    },
    {
      skill: "협업 의지",
      chardonay: minMaxScaling(userData.topicCount + maxValue * 0.3),
      // "chardonay": 7,
    },
    {
      skill: "일정 관리",
      chardonay: minMaxScaling(userData.taskCount + maxValue * 0.3),
      // "chardonay": 8,
    },
  ];

  return (
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
      colors={[userData.profileColor]}
      fillOpacity={0.6}
      blendMode="normal"
      motionConfig="default"
    />
  );
};

export default ProfileRadarChart;
