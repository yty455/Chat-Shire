import React, { useRef, useEffect } from "react";
import Container from "./Container";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import styles from "./LeftSide.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginuser,
  nowProject_recoil,
  expandedState_recoil,
} from "../../stores/atom";
import { getProfile } from "../../utils/userApi";
import { userState } from "../../utils/userApi";
import { AiFillHome } from "react-icons/ai";
import { RiRocket2Fill } from "react-icons/ri";
import ColorPickerDialog from "./ColorPickerDialog";
import {
  BiSolidMessageSquareDots,
  BiTask,
  BiSolidBulb,
  BiSolidPieChartAlt2,
  BiSolidDownArrow,
} from "react-icons/bi";
import {
  StyledBadge,
  StyledBadge1,
  StyledBadge2,
  StyledBadge3,
} from "./StyledBadge";

interface Props {
  window?: () => Window;
}

const dummyData = [
  {
    id: 1,
    name: "특화PJT",
    teamName: "123",
    topic: "123",
    startDate: "2023-09-20",
    endDate: "2023-09-27",
    gitRepository: "123",
    description: "123",
  },
  {
    id: 2,
    name: "공통PJT",
    teamName: "123",
    topic: "123",
    startDate: "2023-09-20",
    endDate: "2023-09-27",
    gitRepository: "123",
    description: "123",
  },
  {
    id: 3,
    name: "관통PJT",
    teamName: "123",
    topic: "123",
    startDate: "2023-09-20",
    endDate: "2023-09-27",
    gitRepository: "123",
    description: "123",
  },
  {
    id: 4,
    name: "관통PJT",
    teamName: "123",
    topic: "123",
    startDate: "2023-09-20",
    endDate: "2023-09-27",
    gitRepository: "123",
    description: "123",
  },
];

function LeftSide(props: Props) {
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = useRecoilState(loginuser);
  const [pjtData, setPjtData] = useRecoilState(nowProject_recoil);

  const [colorPickerOpen, setColorPickerOpen] = React.useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(-1); // 선택한 버튼 인덱스를 관리
  const [color, setColor] = React.useState(""); // 선택한 색상을 상태로 관리

  const [expanded, setExpanded] = useRecoilState(expandedState_recoil);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  function colorChange() {
    if (location.pathname.includes("analysis")) {
      return "#ffffff";
    } else {
      return "#000000";
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getProfilePage = async () => {
    try {
      const response = await getProfile();
      console.log(response.data.result[0]);
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // 색상 선택 다이얼로그 열기
  const openColorPicker = () => {
    // setSelectedButtonIndex();
    setColorPickerOpen(true);
  };

  const handleColorSelect = (selectedColor: string) => {
    console.log(selectedColor);
    setColor(selectedColor); // 선택한 색상을 부모 컴포넌트의 상태에 업데이트
    userStateChange(selectedColor); // 선택한 색상으로 함수 호출
  };

  const userStateChange = async (state: string) => {
    try {
      const response = await userState(state);
      console.log(response);
      getProfilePage();
    } catch (error) {
      console.error(error);
    }
  };

  function AccordianIcon(index: any) {
    if (index === 0) {
      return <BiSolidMessageSquareDots size={20} />;
    } else if (index === 1) {
      return <BiTask size={20} />;
    } else if (index === 2) {
      return <BiSolidBulb size={20} />;
    } else if (index === 3) {
      return <BiSolidPieChartAlt2 size={20} />;
    }
  }

  function navBarClick(index: any, pjtId: any) {
    if (index === 0) {
      navigate("/message/" + pjtId);
    } else if (index === 1) {
      navigate("/task/" + pjtId);
    } else if (index === 2) {
      navigate("/idea/" + pjtId);
    } else if (index === 3) {
      navigate("/analysis/" + pjtId);
    }
  }

  function navigateMain() {
    setExpanded(false);
    navigate("/main");
  }

  function navigateProfile() {
    setExpanded(false);
    navigate("/profile/");
  }

  useEffect(() => {
    {
      userData && getProfilePage();
    }
  }, []);

  return (
    <Container
      backgroundColor={
        location.pathname.includes("analysis") ? "#ffffff2a" : "#ffffff"
      }
      border="1px solid #E5E8EB"
      text=""
      width="12vw"
      height="85vh"
      borderRadius="20px"
      margin="0px 1vw 0px 0px"
      padding=""
      boxShadow=""
      backdropFilter="blur(7px)"
    >
      <div
        className="sideTabContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "120px",
          marginTop: "36px",
        }}
      >
        {userData?.state === "ONLINE" ? (
          <StyledBadge
            onClick={() => openColorPicker()}
            className={styles.profileimg}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              onClick={() => navigateProfile()}
              alt="Remy Sharp"
              src={
                userData?.profileImage != null
                  ? process.env.PUBLIC_URL + userData?.profileImage
                  : process.env.PUBLIC_URL + "/assets/profile/m57.png"
              }
              sx={{ width: 120, height: 120, bgcolor: userData?.profileColor }}
            />
          </StyledBadge>
        ) : userData?.state === "AWAY" ? (
          <StyledBadge1
            onClick={() => openColorPicker()}
            className={styles.profileimg}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              onClick={() => navigateProfile()}
              alt="Remy Sharp"
              src={
                userData?.profileImage != null
                  ? process.env.PUBLIC_URL + userData?.profileImage
                  : process.env.PUBLIC_URL + "/assets/profile/m57.png"
              }
              sx={{ width: 120, height: 120, bgcolor: userData?.profileColor }}
            />
          </StyledBadge1>
        ) : userData?.state === "OFFLINE" ? (
          <StyledBadge2
            onClick={() => openColorPicker()}
            className={styles.profileimg}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              onClick={() => navigateProfile()}
              alt="Remy Sharp"
              src={
                userData?.profileImage != null
                  ? process.env.PUBLIC_URL + userData?.profileImage
                  : process.env.PUBLIC_URL + "/assets/profile/m57.png"
              }
              sx={{ width: 120, height: 120, bgcolor: userData?.profileColor }}
            />
          </StyledBadge2>
        ) : userData?.state === "DND" ? (
          <StyledBadge3
            onClick={() => openColorPicker()}
            className={styles.profileimg}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              onClick={() => navigateProfile()}
              alt="Remy Sharp"
              src={
                userData?.profileImage != null
                  ? process.env.PUBLIC_URL + userData?.profileImage
                  : process.env.PUBLIC_URL + "/assets/profile/m57.png"
              }
              sx={{ width: 120, height: 120, bgcolor: userData?.profileColor }}
            />
          </StyledBadge3>
        ) : (
          <StyledBadge
            onClick={() => openColorPicker()}
            className={styles.profileimg}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              onClick={() => navigateProfile()}
              alt="Remy Sharp"
              src={
                userData?.profileImage != null
                  ? process.env.PUBLIC_URL + userData?.profileImage
                  : process.env.PUBLIC_URL + "/assets/profile/m57.png"
              }
              sx={{ width: 120, height: 120, bgcolor: userData?.profileColor }}
            />
          </StyledBadge>
        )}

        <h5 className={styles.profilename}>
          {userData ? userData?.nickname : "CSI"}
        </h5>
      </div>
      <List className={styles.sideTabItemContainer}>
        <ListItem disablePadding>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginLeft: "16px",
              width: "120px",
              height: "50px",
              color: "#575757",
            }}
            onClick={() => navigateMain()}
          >
            <AiFillHome
              size={24}
              color={`${
                location.pathname.includes("analysis") ? "#ffffff" : "#575757"
              }`}
            />
            <span
              style={{
                marginLeft: "10px",
                color: `${
                  location.pathname.includes("analysis") ? "#ffffff" : "#575757"
                }`,
              }}
            >
              Home
            </span>
          </div>
        </ListItem>
        {(pjtData.length > 0 ? pjtData : dummyData).map((pjt, index) => (
          <ListItem style={{ padding: "0px" }} key={pjt?.id}>
            <div className={styles.TabBarProject} style={{ padding: "0px" }}>
              <Accordion
                expanded={expanded === pjt?.id}
                onChange={handleChange(pjt?.id)}
                style={{
                  width: "178px",
                  borderRadius: "0px",
                  boxShadow: "none",
                  color: `${
                    location.pathname.includes("analysis")
                      ? "#ffffff"
                      : "#575757"
                  }`,
                  backgroundColor: `${
                    location.pathname.includes("analysis")
                      ? "#ffffff00"
                      : "#ffffff"
                  }`,
                }}
              >
                <AccordionSummary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50px",
                    minHeight: "50px",
                    margin: "0px",
                  }}
                  expandIcon={
                    <BiSolidDownArrow
                      size={12}
                      color={`${
                        location.pathname.includes("analysis")
                          ? "#ffffff"
                          : "#575757"
                      }`}
                    />
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "50px",
                    }}
                  >
                    <div style={{ width: "35px", minWidth: "0px" }}>
                      <RiRocket2Fill className={styles.RocketIcon} size={24} />
                    </div>
                    <span>{pjt.name}</span>
                  </div>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0px 16px" }}>
                  {["Chat", "Task", "Board", "Analysis"].map((text, index) => (
                    <ListItemButton
                      sx={{
                        padding: "0px 0px 0px 4px",
                        marginBottom: "4px",
                        width: "140px",
                        height: "32px",
                      }}
                      className={styles.AccordianItem}
                      onClick={() => {
                        navBarClick(index, pjt.id);
                      }}
                    >
                      {AccordianIcon(index)}
                      <span style={{ marginLeft: "8px" }}>{text}</span>
                    </ListItemButton>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          </ListItem>
        ))}
      </List>
      <ColorPickerDialog
        open={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        onSelectColor={handleColorSelect}
      />
    </Container>
  );
}

export default LeftSide;
