"use strict";

import React, { useState } from 'react'
import styles from './CustomProfile.module.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Zoom';
import Slide from '@mui/material/Slide'
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';

import { ChromePicker } from 'react-color'

export default function CustomProfile() {
  const male = process.env.PUBLIC_URL + '/assets/profile/maleSelector.png'
  const female = process.env.PUBLIC_URL + '/assets/profile/femaleSelector.png'
  const [profileColor, setProfileColor] = useState("red")
  const [gender, setGender] = useState(true)
  const [activateProfileCustom, setActivateProfileCustom] = useState(false)
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [profileImg, setProfileImg] = useState(process.env.PUBLIC_URL +'/assets/profile/male/m25.png')
  const [selectedImg, setSelectedImg] = useState('')
  const containerRef = React.useRef<HTMLElement>(null);

  function activateCustom() {
    console.log(activateProfileCustom)
    setActivateProfileCustom(!activateProfileCustom)
  }

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function selectExample(e: any) {
    setProfileColor(e.target.id)
  }

  function handleChange(color: any) {
    console.log(color);
    setProfileColor(color.hex);
  }

  function handleGender() {
    setGender(!gender);
    setSelectedImg('')
  }

  function changeAvatar(e: any) {
    if (gender === true) {
      setProfileImg(process.env.PUBLIC_URL +'/assets/profile/male/m' + e.target.id +'.png');
      setSelectedImg(e.target.id)
    } else if (gender === false) {
      setProfileImg(process.env.PUBLIC_URL +'/assets/profile/female/f' + e.target.id +'.png');
      setSelectedImg(e.target.id)
    }
  }

  return (
    <div className={styles.AvatarCustomContainer}>
      <div className={styles.AvatarCustomHeader}>
        <span className={styles.AvatarCustomTitle}>MINIME CUSTOM</span>
      </div>
      <div className={styles.AvatarCustomBody}>
        <div className={styles.AvatarCustomBodyLeft}>
          <div id="#f78da7" onClick={selectExample} className={styles.exampleColor} style={{backgroundColor: "#f78da7"}}></div>
          <div id="#7bdcb5" onClick={selectExample} className={styles.exampleColor} style={{backgroundColor: "#7bdcb5"}}></div>
          <div id="#8ed1fc" onClick={selectExample} className={styles.exampleColor} style={{backgroundColor: "#8ed1fc"}}></div>
          <div id="#abb8c3" onClick={selectExample} className={styles.exampleColor} style={{backgroundColor: "#abb8c3"}}></div>
          <div style={{position: "relative"}}>
            <div className={styles.exampleColor} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/rainbow.png'})`, backgroundPosition: "center center", backgroundSize: "50px 50px"}} onClick={handleClick}></div>
            <Grow in={displayColorPicker} style={{ transformOrigin: "100% 100% 0"}}>
              <div style={{position: "absolute", bottom: "30px", right: "30px"}}>
                <ChromePicker disableAlpha={true} color={profileColor} onChange={handleChange} />
              </div>
            </Grow>
          </div>
        </div>
        <div className={styles.AvatarCustomBodyCenter}>
          <div className={styles.profilePreview} style={{position: "relative", backgroundColor: profileColor}}>
            <img style={{position: "absolute", bottom: "0"}} width="260px" height="260px" src={profileImg} alt="" />  
          </div>
        </div>
        <div className={styles.AvatarCustomBodyRight}>
          <div className={styles.profileImgSelector}>
            <div className={styles.profileImgSelectorRight}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    padding: "6px 4px",
                    position: "absolute",
                    left: "10px",
                    width: "400px",
                    height: "400px",
                  }}
                >
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="1"
                      className={styles.profileSelectItem}
                      style={selectedImg === '1' ? { border: "2px solid #afafaf", backgroundColor: "#ffffffcc" } : {}}
                      onClick={changeAvatar}
                    >
                    </div>
                    <div
                      id="2"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '2' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="3"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '3' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="4"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '4' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="5"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '5' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="6"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '6' ? { border: "3px solid #45CEA8" } : {}}
                    ></div>
                    <div
                      id="7"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '7' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="8"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '8' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="9"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '9' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="10"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '10' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="11"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '11' ? { border: "3px solid #45CEA8" } : {}}
                    ></div>
                    <div
                      id="12"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '12' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="13"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '13' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="14"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '14' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="15"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '15' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="16"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '16' ? { border: "3px solid #45CEA8" } : {}}
                    ></div>
                    <div
                      id="17"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '17' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="18"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '18' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="19"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '19' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="20"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '20' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="21"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '21' ? { border: "3px solid #45CEA8" } : {}}
                    ></div>
                    <div
                      id="22"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '22' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="23"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '23' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="24"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '24' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                    <div
                      id="25"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={selectedImg === '25' ? { border: "3px solid #45CEA8"} : {}}
                    ></div>
                  </div>
                </div>
                { gender ? <img style={{ marginLeft: "10px" }} height="400px" src={male} alt=""/> : <img style={{ marginLeft: "10px" }} height="400px" src={female} alt=""/>}
              </div>
              <div className={styles.profileImgSelectorButtons}>
                <Button color="greenary" value="male" variant="contained" onClick={handleGender}>
                  <BsGenderMale/>
                  <BsGenderFemale/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
