import React from 'react'
import styles from './TeamTask.module.css'
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CreateIcon from '@mui/icons-material/Create';
import Checkbox from '@mui/material/Checkbox';
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 0,
  margin: '0 0 5px 0',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode === 'light' ? '#39A789' : '#308fe8',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      // position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function TeamTask() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.messageLeftTitle}>2차 특화 PJT</p>
      </div>
      <div style={{display:'flex',justifyContent:'space-around'}}>
        <div style={{padding:'0 0 20px 20px',width:'50%'}}>
          <p className={styles.taskProgress}>Task 진행도</p>
          <div className={styles.progressBar}>진행도 그래프</div>
          <p className={styles.taskProgress}>완료된 Task</p>

          <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon/>
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <CreateIcon/>
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{margin:'14px 0 15px 20px'}}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
          </div>


        </div>
        <div style={{padding:'0 20px 0 20px',width:'50%'}}>
        <p className={styles.taskProgress}>진행중인 Task</p>
        <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon/>
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <CreateIcon/>
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{margin:'14px 0 15px 20px'}}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
          </div>

          <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon/>
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <CreateIcon/>
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{margin:'14px 0 15px 20px'}}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
          </div>

          <div className={styles.taskContainer}>
            <div className={styles.taskHeader}>
              <div className={styles.clockNday}>
                <WatchLaterIcon/>
                <p className={styles.dday}> 6d 14h</p>
              </div>
              <CreateIcon/>
            </div>
            <div className={styles.stepStatus}>
              <StyledBadge
                sx={{margin:'14px 0 15px 20px'}}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              ></StyledBadge>
              <p className={styles.step}>기획</p>
            </div>
            <BorderLinearProgress variant="determinate" value={50} />

            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'10px',margin:'7px 0'}}
                />
                <p className={styles.task}>쓰레기 버리고 오기</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
