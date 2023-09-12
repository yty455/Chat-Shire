import React from "react";
import Container from "./Container";
import LeftSideTab from "./LeftSideTab";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import img from "../../assets/profile/m57.png";
import styles from "./LeftSideTab.module.css";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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

function LeftSide(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const onClick = (link: String) => {
    navigate("./link");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Container
      backgroundColor="#FFFFFF"
      text=""
      width="250px"
      height="85vh"
      borderRadius="20px"
      margin="60px 10px 40px 20px"
      padding=""
      boxShadow=""
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledBadge
          className={styles.profileimg}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={img} sx={{ width: 80, height: 80 }} />
        </StyledBadge>
        <h5 className={styles.profilename}>CSI</h5>
      </div>
      <Divider />
      <List>
        <ListItem disablePadding>
          {/* <Link to={"/main"}> */}
          <ListItemButton>
            <Accordion style={{ width: "100%" }} expanded={false}>
              <AccordionSummary>
                <Box sx={{ width: "35px" }}>
                  <MailIcon />
                </Box>
                <span>Home</span>
                {/* <ListItemText primary="Home" /> */}
              </AccordionSummary>
            </Accordion>
          </ListItemButton>
          {/* </Link> */}
        </ListItem>

        {["특화PJT", "공통PJT", "관통PJT"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Accordion
                expanded={expanded === text}
                onChange={handleChange(text)}
                style={{ width: "100%" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box sx={{ width: "35px" }}>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </Box>
                  <span>{text}</span>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {["Project", "Chat", "Task", "Board"].map((text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
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
