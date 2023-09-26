"use strict";

import React, { useState, useEffect } from "react";
import styles from "./CustomProfile.module.css";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Zoom";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { FaCheck } from 'react-icons/fa'

import { ChromePicker } from "react-color";

import { useRecoilState } from "recoil";
import { isLogin_recoil, loginuser } from '../../stores/atom'
interface CustomProfilePageProps {
  onUpdateProfileColor: any;
  onUpdateProfileImage: any;
}

export default function CustomProfile({
  onUpdateProfileColor,
  onUpdateProfileImage,
}: CustomProfilePageProps) {
  const male = process.env.PUBLIC_URL + "/assets/profile/maleSelector.png";
  const female = process.env.PUBLIC_URL + "/assets/profile/femaleSelector.png";
  const [profileColor, setProfileColor] = useState("grey");
  const [gender, setGender] = useState(true);
  const [activateProfileCustom, setActivateProfileCustom] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [profileImg, setProfileImg] = useState(
    process.env.PUBLIC_URL + "/assets/profile/male/m25.png"
  );
  const [isLogin, setIsLogin] = useRecoilState(isLogin_recoil)
  const [userData, setUserData] = useRecoilState(loginuser);
  const [selectedImg, setSelectedImg] = useState("");
  const containerRef = React.useRef<HTMLElement>(null);

  function activateCustom() {
    setActivateProfileCustom(!activateProfileCustom);
  }

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function selectExample(e: any) {
    setProfileColor(e.target.id);
  }

  function handleChange(color: any) {
    setProfileColor(color.hex);
    // 변경된 색상을 부모 컴포넌트로 전달
    // onUpdateProfileColor(color.hex);
  }

  function handleGender() {
    setGender(!gender);
    setSelectedImg("");
  }

  useEffect(() => {
    if (isLogin) {
      setProfileImg(userData.profileImage)
      setProfileColor(userData.profileColor)
    }
  }, [])

  useEffect(() => {
    onUpdateProfileImage(profileImg);
  }, [profileImg]);

  useEffect(() => {
    onUpdateProfileColor(profileColor);
  }, [profileColor]);

  function changeAvatar(e: any) {
    if (gender === true) {
      setProfileImg(
        process.env.PUBLIC_URL + "/assets/profile/male/m" + e.target.id + ".png"
      );
      setSelectedImg(e.target.id);
    } else if (gender === false) {
      setProfileImg(
        process.env.PUBLIC_URL +
          "/assets/profile/female/f" +
          e.target.id +
          ".png"
      );
      setSelectedImg(e.target.id);
    }
  }

  return (
    <div className={styles.AvatarCustomContainer}>
      <div className={styles.AvatarCustomHeader}>
        <span className={styles.AvatarCustomTitle}>미니미 커스텀</span>
      </div>
      <div className={styles.AvatarCustomBody}>
        <div className={styles.AvatarCustomBodyLeft}>
          <div
            id="#f78da7"
            onClick={selectExample}
            className={styles.exampleColor}
            style={{ backgroundColor: "#f78da7" }}
          ></div>
          <div
            id="#7bdcb5"
            onClick={selectExample}
            className={styles.exampleColor}
            style={{ backgroundColor: "#7bdcb5" }}
          ></div>
          <div
            id="#8ed1fc"
            onClick={selectExample}
            className={styles.exampleColor}
            style={{ backgroundColor: "#8ed1fc" }}
          ></div>
          <div
            id="#abb8c3"
            onClick={selectExample}
            className={styles.exampleColor}
            style={{ backgroundColor: "#abb8c3" }}
          ></div>
          <div style={{ position: "relative" }}>
            <div
              className={styles.exampleColor}
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/assets/rainbow.png"
                })`,
                backgroundPosition: "center center",
                backgroundSize: "50px 50px",
              }}
              onClick={handleClick}
            ></div>
            <Grow
              in={displayColorPicker}
              style={{ transformOrigin: "100% 100% 0" }}
            >
              <div
                style={{ position: "absolute", bottom: "30px", right: "30px" }}
              >
                <ChromePicker
                  disableAlpha={true}
                  color={profileColor}
                  onChange={handleChange}
                />
              </div>
            </Grow>
          </div>
        </div>
        <div className={styles.AvatarCustomBodyCenter}>
          <div
            className={styles.profilePreview}
            style={{ position: "relative", backgroundColor: profileColor }}
          >
            <img
              style={{ position: "absolute", bottom: "0" }}
              width="260px"
              height="260px"
              src={profileImg}
              alt=""
            />
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
                    padding: "2px 2px",
                    position: "absolute",
                    left: "10px",
                    width: "430px",
                    height: "430px",
                  }}
                >
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="1"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "1"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "1"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="2"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "2"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "2"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="3"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "3"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "3"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="4"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "4"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "4"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="5"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "5"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "5"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="6"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "6"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "6"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="7"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "7"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "7"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="8"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "8"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "8"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="9"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "9"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "9"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="10"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "10"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "10"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="11"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "11"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "11"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="12"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "12"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "12"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="13"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "13"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "13"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="14"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "14"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "14"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="15"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "15"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "15"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="16"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "16"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "16"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="17"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "17"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "17"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="18"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "18"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "18"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="19"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "19"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "19"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="20"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "20"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "20"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                  </div>
                  <div className={styles.profileImgSelectorRow}>
                    <div
                      id="21"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "21"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "21"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="22"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "22"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "22"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="23"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "23"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "23"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="24"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "24"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "24"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                    <div
                      id="25"
                      className={styles.profileSelectItem}
                      onClick={changeAvatar}
                      style={
                        selectedImg === "25"
                          ? { 
                              transition: "0.3s",
                              border: "3px solid #39a789",
                              backgroundColor: "#ffffffcc",
                            }
                          : {
                              border: "3px solid #ffffff",
                              transition: "0.3s",
                            }
                      }
                    >
                      {selectedImg === "25"
                          ? <FaCheck color="#39a789" size={30}/> : null}
                    </div>
                  </div>
                </div>
                {gender ? (
                  <img
                    style={{ marginLeft: "10px" }}
                    height="430px"
                    src={male}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ marginLeft: "10px" }}
                    height="430px"
                    src={female}
                    alt=""
                  />
                )}
              </div>
              <div className={styles.profileImgSelectorButtons}>
                <IconButton
                  color="greenary"
                  value="male"
                  onClick={handleGender}
                >
                  {gender ? <BsGenderMale /> : <BsGenderFemale />}
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
