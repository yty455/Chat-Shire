"use strict";

import React, { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import styles from "./ProfileSetting.module.css";

import img from "../../assets/profile/male/m1.png";
import male from "../../assets/profile/maleSelector.png";
import female from "../../assets/profile/femaleSelector.png";

export default function ProfileSetting() {
  const [profileColor, setProfileColor] = useState("red");
  const [gender, setGender] = useState(female);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [profileImg, setProfileImg] = useState(
    "../../assets/profile/male/m1.png"
  );

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleChange(color: any) {
    console.log(color);
    setProfileColor(color.hex);
  }

  function handleGender(e: any) {
    setGender(e.target.value);
  }

  function changeAvatar(e: any) {
    if (gender === male) {
      console.log("m" + e.target.id);
    } else if (gender === female) {
      console.log("f" + e.target.id);
    }
  }

  return (
    <div className={styles.profileSettingContainer}>
      <div className={styles.profileImgSetting}>
        <div>
          <div
            className={styles.profilePreview}
            style={{ backgroundColor: profileColor }}
          >
            <img width="200px" height="200px" src={img} alt="" />
          </div>
        </div>
        <div className={styles.profileImgSelector}>
          <SketchPicker color={profileColor} onChange={handleChange} />
          <div className={styles.profileImgSelectorRight}>
            <div>
              <button value={male} onClick={handleGender}>
                male
              </button>
              <button value={female} onClick={handleGender}>
                female
              </button>
            </div>
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
                  border: "1px solid red",
                }}
              >
                <div
                  id="1"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                ></div>
                <div
                  id="2"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="3"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="4"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="5"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="6"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                ></div>
                <div
                  id="7"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="8"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="9"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="10"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="11"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                ></div>
                <div
                  id="12"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="13"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="14"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="15"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="16"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                ></div>
                <div
                  id="17"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="18"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="19"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="20"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="21"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                ></div>
                <div
                  id="22"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="23"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="24"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
                <div
                  id="25"
                  className={styles.profileSelectItem}
                  onClick={changeAvatar}
                  style={{ margin: "0px 0px 0px 11px" }}
                ></div>
              </div>
              <img
                style={{ marginLeft: "10px" }}
                height="400px"
                src={gender}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
