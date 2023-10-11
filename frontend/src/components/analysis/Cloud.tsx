import React, { useState } from "react";
import WordCloud from "react-d3-cloud";
import { useRecoilState } from "recoil";
import {
  workStyleColor_recoil,
  keywords_recoil,
  allCategoryCount_recoil,
} from "../../stores/atom";
import { Popover } from "antd";

export default function Cloud() {
  const [workStyleColor, setWorkStyleColor] = useRecoilState(
    workStyleColor_recoil
  );
  const [allCategoryCount, setAllCategoryCount] = useRecoilState(
    allCategoryCount_recoil
  );
  const transformedData = Object.entries(allCategoryCount).map(
    ([text, value]) => ({ text, value: Number(value) })
  );

  function decideWordColor(word: any) {
    if (word.value % 4 === 0) {
      return workStyleColor.sub;
    } else if (word.value % 4 === 1) {
      return workStyleColor.sub;
    } else if (word.value % 4 === 2) {
      return "#ffffff";
    } else {
      return "#ffffff";
    }
  }

  return (
    <div>
      <WordCloud
        data={transformedData}
        width={1200}
        height={500}
        font={"preRg"}
        fontWeight={"bold"}
        fontSize={(word) => Math.log2(word.value) * 10}
        spiral={"rectangular"}
        rotate={(word) => word.value * 90}
        onWordMouseOver={(event, d) => {
          console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={() => {
          // Hide the popover when mouse is moved away
        }}
        fill={(word) => decideWordColor(word)}
      />
    </div>
  );
}
