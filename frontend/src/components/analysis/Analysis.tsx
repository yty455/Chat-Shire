import React, { ReactElement, useEffect, useState } from "react";
import styles from "./Analysis.module.css";
import Keywords from "./Keywords";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import PiChart from "./PiChart";
import Cloud from "./Cloud";
// import Rocket from "../../assets/analysisBg/passion/passion3.png";

import api from "../../utils/api";
import { getAnalysis } from "../../utils/analysisApi";
import { useRecoilState } from "recoil";
import {
  workStyle_recoil,
  workStyleColor_recoil,
  keywords_recoil,
  morningCount_recoil,
  afternoonCount_recoil,
  nightCount_recoil,
  issueCount_recoil,
  allCategoryCount_recoil,
  taskCount_recoil,
} from "../../stores/atom";
import { JsxElement } from "typescript";

interface AnalysisProps {
  projectId: string;
}

export default function Analysis({ projectId }: AnalysisProps) {
  const [workStyle, setWorkStyle] = useRecoilState(workStyle_recoil);
  const [workStyleColor, setWorkStyleColor] = useRecoilState(workStyleColor_recoil);
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
  const characterImg =
    process.env.PUBLIC_URL +
    `/assets/analysisBg/${workStyle}/${workStyle}2.png`;
  const [projectInfo, setProjectInfo] = useState<any>();
  const [teamMembers, setTeamMembers] = useState<any[]>();
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
  const getAnalysisPage = async () => {
    try {
      const response = await getAnalysis(projectId);
      setMorningCommit(response.data.result[0].morningCommit);
      setAfternoonCommit(response.data.result[0].afternoonCommit);
      setNightCommit(response.data.result[0].nightCommit);
      setIssueCount(response.data.result[0].issueCount);
      setAllCategoryCount(response.data.result[0].allCategoryCount);
      setTaskCount(response.data.result[0].taskCount);
    } catch (error) {
      console.error(error);
    }
  };
  const getKeywords = () => {
    api.get(`/projects/${projectId}/keywords`).then((res) => {
      console.log(res);
      setKeywords(res.data.result[0]);
    });
  };
  const getProject = () => {
    api
      .get("/projects/" + projectId)
      .then((res) => {
        setProjectInfo(res.data.result[0]);
      })
      .catch((err) => console.log(err));

    api
      .get("/projects/" + projectId + "/users")
      .then((res) => {
        setTeamMembers(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  };
  const caculateWorkStyle = () => {
    if (morningCommit + afternoonCommit + nightCommit > 30) {
      setWorkStyle("passion");
      setWorkStyleColor({main: "#EB9042", sub: "#AE2949"})
    } else if (taskCount > 5) {
      setWorkStyle("jjjj");
      setWorkStyleColor({main: "#54CCC7", sub: "#4ED480"})
    } else if (totalChatCount(allCategoryCount) > 100) {
      setWorkStyle("chat");
      setWorkStyleColor({main: "#F3AAF7", sub: "#779DFF"})
    } else if (nightCommit > 9) {
      setWorkStyle("night");
      setWorkStyleColor({main: "#E8CA46", sub: "#3E008C"})
    } else if (issueCount > 3) {
      setWorkStyle("fix");
      setWorkStyleColor({main: "#C03AEC", sub: "#3E008C"})
    } else if (relevantChatCount(allCategoryCount) > 50) {
      setWorkStyle("idea");
      setWorkStyleColor({main: "#FFDD88", sub: "#F0ADC7"})
    }
  };

  const returnBodyDesc = () => {
    if (workStyle === "baby") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>다 비켜!</span>
          <span className={styles.analysisBodyDescDown}>코린이가 간다</span>
        </div>
      );
    } else if (workStyle === "passion") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>앗뜨거!</span>
          <span className={styles.analysisBodyDescDown}>열정 130'C</span>
        </div>
      );
    } else if (workStyle === "idea") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>도전!</span>
          <span className={styles.analysisBodyDescDown}>아이디어 뱅크</span>
        </div>
      );
    } else if (workStyle === "jjjj") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>MBTI가..</span>
          <span className={styles.analysisBodyDescDown}>JJJJ 입니다</span>
        </div>
      );
    } else if (workStyle === "chat") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>우리 사이?</span>
          <span className={styles.analysisBodyDescDown}>나는너 너는나</span>
        </div>
      );
    } else if (workStyle === "night") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>새벽의</span>
          <span className={styles.analysisBodyDescDown}>고독한 개발자</span>
        </div>
      );
    } else if (workStyle === "fix") {
      return (
        <div className={styles.analysisBodyDesc}>
          <span className={styles.analysisBodyDescUp}>나는야</span>
          <span className={styles.analysisBodyDescDown}>다고쳐 펠릭스</span>
        </div>
      )
    }
  };

  const returnTeamMembers = teamMembers?.map((member: any) => {
    return <span>{member.nickname}, </span>;
  });

  const returnKeywords = Object.entries(allCategoryCount)
    .sort((a: any, b: any) => a[1] - b[1]).splice(0, 6)
    .map((entry) => {
      let isSelected = false;
      if (keywords.includes(entry[0])) {
        isSelected = true;
      } else {
        isSelected = false;
      }
      return (
        <Keywords topic={entry[0]} projectId={Number(projectId)} isSelected />
      );
    });

  useEffect(() => {
    getAnalysisPage();
    getKeywords();
    caculateWorkStyle();
    getProject();
  }, [projectId]);

  return (
    <div
      className={styles.analysisContainer}
      style={{ backgroundImage: `url(${characterImg})` }}
    >
      <div className={styles.analysisHeader}>
        <img
          style={{
            position: "absolute",
            left: "23vw",
            top: "1vh",
            width: "300px",
          }}
          src={
            process.env.PUBLIC_URL +
            `/assets/analysisBg/${workStyle}/${workStyle}3.png`
          }
          alt=""
        />
        <div className={styles.analysisTopicsContainer}>
          <span className={styles.analysisItemTitle}>우리의 키워드</span>
          <div className={styles.analysisKeywordsContainer}>
            {returnKeywords}
          </div>
        </div>
        <div className={styles.analysisPiGraphContainer}>
          <span className={styles.analysisItemTitle}>밤에 안자고 뭐하니?</span>
          <div className={styles.analysisCharts}>
            <div className={styles.analysisPiChart}>
              <PiChart />
            </div>
            <div className={styles.analysisBarChart}>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.analysisBody}>
        <div className={styles.analysisRadarContainer}>
          <RadarChart />
        </div>
        <div className={styles.analysisResult}>
          <div className={styles.analysisBodyTitle}>
            <span className={styles.analysisBodyTitleLeft}>
              TEAM {projectInfo?.teamName}의
            </span>
            <span className={styles.analysisBodyTitleRight}>워크스타일은?</span>
          </div>
          <div>
            {returnBodyDesc()}
          </div>
        </div>
      </div>
      <div className={styles.analysisFooter}>
        <div className={styles.analysisWordCloudContainer}>
          <span className={styles.analysisItemTitle}>
            {projectInfo?.teamName}의 관심사는 뭐에요?
          </span>
          <Cloud />
        </div>
        <div className={styles.analysisInfoContainer}>
          <span className={styles.analysisInfoTitle}>작업 기간</span>
          <span className={styles.analysisItemDesc}>
            {projectInfo?.startDate} ~ {projectInfo?.endDate}
          </span>
          <span className={styles.analysisInfoTitle}>참여 인원</span>
          <span className={styles.analysisItemDesc}>{returnTeamMembers}</span>
          <span className={styles.analysisInfoTitle}>우리 프로젝트는</span>
          <span className={styles.analysisItemDesc}>{projectInfo?.topic}</span>
        </div>
      </div>
    </div>
  );
}
