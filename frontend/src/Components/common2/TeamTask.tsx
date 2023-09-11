import React from 'react'
import styles from './TeamTask.module.css'
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CreateIcon from '@mui/icons-material/Create';
import Checkbox from '@mui/material/Checkbox';
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

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
          <h1 style={{marginTop: 0,marginBottom:'4px',display:'flex'}}>task 진행도</h1>
          <div style={{backgroundColor:'red', height:'180px'}}>d</div>
          <h1 style={{display:'flex',marginBottom:'4px'}}>완료 task</h1>
          <div style={{border:'1px solid grey', borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{display:'flex',justifyContent:'center'}}>
                <WatchLaterIcon/>
                <p style={{margin:0}}>6d 14h</p>
              </div>
              <CreateIcon/>
            </div>

            <div style={{display:'flex', justifyContent:'start'}}>
              <StyledBadge
                className={styles.profileimg}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              >
              </StyledBadge>
              <h5 style={{marginTop: 0, marginLeft:'10px', display:'flex'}}>기획</h5>
            </div>
            <hr style={{border:'1px solid grey'}}/>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'20px',margin:'14px 0'}}
                />
                <p>쓰레기 버리고 오기</p>
            </div>
          </div>
        </div>
        <div style={{padding:'0 20px 0 20px',width:'50%'}}>
          <h1 style={{display:'flex', margin:0}}>진행중인 task</h1>
          <div style={{marginBottom:'5px',border:'1px solid grey', borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{display:'flex',justifyContent:'center'}}>
                <WatchLaterIcon/>
                <p style={{margin:0}}>6d 14h</p>
              </div>
              <CreateIcon/>
            </div>

            <div style={{display:'flex', justifyContent:'start'}}>
              <StyledBadge
                className={styles.profileimg}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              >
              </StyledBadge>
              <h5 style={{marginTop: 0, marginLeft:'10px', display:'flex'}}>기획</h5>
            </div>
            <hr style={{border:'1px solid grey'}}/>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'20px',margin:'14px 0'}}
                />
                <p>쓰레기 버리고 오기</p>
            </div>
          </div>
          <div style={{marginBottom:'5px', border:'1px solid grey', borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{display:'flex',justifyContent:'center'}}>
                <WatchLaterIcon/>
                <p style={{margin:0}}>6d 14h</p>
              </div>
              <CreateIcon/>
            </div>

            <div style={{display:'flex', justifyContent:'start'}}>
              <StyledBadge
                className={styles.profileimg}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              >
              </StyledBadge>
              <h5 style={{marginTop: 0, marginLeft:'10px', display:'flex'}}>기획</h5>
            </div>
            <hr style={{border:'1px solid grey'}}/>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'20px',margin:'14px 0'}}
                />
                <p>쓰레기 버리고 오기</p>
            </div>
          </div>
          <div style={{marginBottom:'5px', border:'1px solid grey', borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{display:'flex',justifyContent:'center'}}>
                <WatchLaterIcon/>
                <p style={{margin:0}}>6d 14h</p>
              </div>
              <CreateIcon/>
            </div>

            <div style={{display:'flex', justifyContent:'start'}}>
              <StyledBadge
                className={styles.profileimg}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                variant="dot"
              >
              </StyledBadge>
              <h5 style={{marginTop: 0, marginLeft:'10px', display:'flex'}}>기획</h5>
            </div>
            <hr style={{border:'1px solid grey'}}/>
            <div className={styles.indivTask}>
              <Checkbox 
                sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
                style={{height:'20px',margin:'14px 0'}}
                />
                <p>쓰레기 버리고 오기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
