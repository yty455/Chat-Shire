import React, { ReactElement, useEffect, useState } from "react";
import styles from "./Analysis.module.css";
import Keywords from "./Keywords";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import PiChart from "./PiChart";
import Cloud from "./Cloud";
// import Rocket from "../../assets/analysisBg/passion/passion3.png";
import { BsPencilFill } from "react-icons/bs";
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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { keyword } from "../../stores/keyword";
import { postKeyword, deleteKeyword } from "../../utils/keywordApi";
import { Popover } from "antd";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


interface AnalysisProps {
  projectId: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function Analysis({ projectId }: AnalysisProps) {
  const [selectedKeyword, setSelectedKeyword]  = useState<string[]>([])
  const [workStyle, setWorkStyle] = useRecoilState(workStyle_recoil);
  const [workStyleColor, setWorkStyleColor] = useRecoilState(
    workStyleColor_recoil
  );
  const [keywords, setKeywords] = useRecoilState(keywords_recoil);
  const [morningCommit, setMorningCommit] = useRecoilState(morningCount_recoil);
  const [afternoonCommit, setAfternoonCommit] = useRecoilState(afternoonCount_recoil);
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
      setSelectedKeyword(res.data.result[0])
    });
  };

    // 키워드 등록
    const PostInKeyword = async () => {
      try {
        const addedKeywords = selectedKeyword.filter(keyword => !keywords.includes(keyword));
        const response = await postKeyword(projectId, addedKeywords);
        getKeywords()
      } catch (error) {
        console.error(error);
      }
    };

      // 키워드 취소
  const deleteInKeyword = async () => {
    try {
      const deletedKeywords = keywords.filter(keyword => !selectedKeyword.includes(keyword));
      const response = await deleteKeyword(projectId, deletedKeywords);
      getKeywords()
    } catch (error) {
      console.error(error);
    }
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
      setWorkStyleColor({ main: "#AE2949", sub: "#EB9042" });
    } else if (taskCount > 5) {
      setWorkStyle("jjjj");
      setWorkStyleColor({ main: "#4ED480", sub: "#54CCC7" });
    } else if (totalChatCount(allCategoryCount) > 100) {
      setWorkStyle("chat");
      setWorkStyleColor({ main: "#779DFF", sub: "#F3AAF7" });
    } else if (nightCommit > 9) {
      setWorkStyle("night");
      setWorkStyleColor({ main: "#3E008C", sub: "#E8CA46" });
    } else if (issueCount > 3) {
      setWorkStyle("fix");
      setWorkStyleColor({ main: "#3E008C", sub: "#C03AEC" });
    } else if (relevantChatCount(allCategoryCount) > 50) {
      setWorkStyle("idea");
      setWorkStyleColor({main: "#F0ADC7", sub: "#FFDD88"})
    } else {
      setWorkStyle("baby")
      setWorkStyleColor({main: "#89e3ec", sub: "#ffd82c"})
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
      );
    }
  };

  const returnTeamMembers = teamMembers?.map((member: any) => {
    return <span>{member.nickname}, </span>;
  });

  // const returnKeywords = 
  // Object.entries(allCategoryCount)
  //   .sort((a: any, b: any) => a[1] - b[1])
  //   .splice(0, 6)
  //   .map((entry) => {
  //     let isSelected = false;
  //     if (keywords.includes(entry[0])) {
  //       isSelected = true;
  //     } else {
  //       isSelected = false;
  //     }
  //     return (
  //       <Keywords topic={entry[0]} projectId={Number(projectId)} isSelected />
  //     );
  //   });
  
  const returnKeywords = selectedKeyword.map((key) => (
    <Keywords topic={key} projectId={Number(projectId)} isSelected={true} />
  ));


  useEffect(() => {
    getAnalysisPage();
    getKeywords();
    caculateWorkStyle();
    getProject();
  }, [projectId]);

  useEffect(() => {
    caculateWorkStyle();
  }, [
    morningCommit,
    afternoonCommit,
    nightCommit,
    taskCount,
    totalChatCount(allCategoryCount),
    nightCommit,
    issueCount,
    relevantChatCount(allCategoryCount),
  ]);

  useEffect(() => {
    returnBodyDesc();
  }, [workStyle]);

  const handleChange = (event: SelectChangeEvent<typeof keywords>) => {
    const {
      target: { value },
    } = event;
    setSelectedKeyword(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveCon = () => {
    PostInKeyword()
    deleteInKeyword()
    setOpen(false);
  };

  const key = (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={keywords}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {Object.keys(allCategoryCount).map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={keywords.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
  // useEffect(()=>{
  //   PostInKeyword()
  // },[keywords])



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
          <span className={styles.analysisItemTitle}>우리의 키워드 

          <BsPencilFill
                            style={{
                              fontSize: "17px",
                              // margin: "-5px 3px 10px 0",
                            }}
                            onClick={handleClickOpen}
                          /></span>
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
              <BarChart/>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.analysisBody}>
        <div className={styles.analysisRadarContainer}>
          <RadarChart/>
        </div>
        <div className={styles.analysisResult}>
          <div className={styles.analysisBodyTitle}>
            <span className={styles.analysisBodyTitleLeft}>
              TEAM {projectInfo?.teamName}의
            </span>
            <span className={styles.analysisBodyTitleRight}>워크스타일은?</span>
          </div>
          <div>{returnBodyDesc()}</div>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"우리의 키워드 설정"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Keyword</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedKeyword}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
         {Object.keys(allCategoryCount)
  .filter((name) => keyword?.includes(name))
  .sort((a, b) => allCategoryCount[b] - allCategoryCount[a])
  .map((name) => (
    <MenuItem key={name} value={name}>
      <Checkbox checked={selectedKeyword?.indexOf(name) > -1} />
      <ListItemText primary={name} />
    </MenuItem>
))}
        </Select>
      </FormControl>
    </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSaveCon}>
            저장
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
