import React, { useRef, useEffect } from "react";
import Container from "./Container";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import styles from "./LeftSide.module.css";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginuser, nowProject_recoil } from "../../stores/atom";
import { getProfile } from "../../utils/userApi";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
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
];

function LeftSide(props: Props) {
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = useRecoilState(loginuser);
  const [pjtData, setPjtData] = useRecoilState(nowProject_recoil);

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const onClick = (link: String, id?: any, pjtId?: any) => {
    if (link === "Chat") {
      navigate(`/message/${pjtId}`);
    } else if (link === "Board") {
      navigate(`/idea/${pjtId}`);
    } else if (link === "main") {
      navigate(`/${link.toLowerCase()}`);
    } else if (link === "profile") {
      navigate(`/${link.toLowerCase()}`);
    } else {
      navigate(`/${link.toLowerCase()}/${pjtId}`);
    }
  };

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

  useEffect(() => {
    getProfilePage();
  }, []);

  return (
    <Container
      backgroundColor={
        location.pathname !== "/analysis" ? "#FFFFFF" : "#ffffff2a"
      }
      border="1px solid #E5E8EB"
      text=""
      width="14vw"
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
        }}
      >
        <StyledBadge
          onClick={() => onClick("profile")}
          className={styles.profileimg}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt="Remy Sharp"
            src={
              userData
                ? process.env.PUBLIC_URL + userData.profileImage
                : process.env.PUBLIC_URL + "/assets/profile/m57.png"
            }
            sx={{ width: 80, height: 80 }}
          />
        </StyledBadge>
        <h5 className={styles.profilename}>
          {userData ? userData.nickname : "CSI"}
        </h5>
      </div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onClick("main")}>
            <Accordion
              style={{
                width: "100%",
                borderRadius: "10px",
                backgroundColor:
                  location.pathname !== "/analysis" ? "#FFFFFF" : "#ffffff2a",
              }}
              expanded={false}
              className={styles.box}
            >
              <AccordionSummary
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "35px" }}>
                  <MailIcon />
                </Box>
                <span>Home</span>
                {/* <ListItemText primary="Home" /> */}
              </AccordionSummary>
            </Accordion>
          </ListItemButton>
        </ListItem>
        {(pjtData.length > 0 ? pjtData : dummyData).map((pjt, index) => (
          <ListItem key={pjt?.id} disablePadding>
            <ListItemButton>
              <Accordion
                className={styles.box}
                expanded={expanded === pjt?.id}
                onChange={handleChange(pjt?.id)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  // backgroundColor:
                  //   location.pathname !== "/analysis" ? "#FFFFFF" : "#ffffff2a",
                }}
              >
                <AccordionSummary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box sx={{ width: "35px" }}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </Box>
                  <span>{pjt.name}</span>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "0px 16px 0px 16px" }}>
                  <List>
                    {["Chat", "Task", "Board", "Analysis"].map(
                      (text, index) => (
                        <ListItem key={text} disablePadding>
                          <ListItemButton
                            onClick={() => onClick(text, index, pjt.id)}
                            style={{ padding: "4px 16px 4px 16px" }}
                          >
                            <ListItemIcon>
                              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItemButton>
                        </ListItem>
                      )
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default LeftSide;
