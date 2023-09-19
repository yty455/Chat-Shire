import React from "react";
import { useRecoilState } from "recoil";
import Idea from "../components/idea/Idea";
import Share from "../components/idea/Share";
import ErrorBoard from "../components/error/ErrorBoard";
import LeftSide from "../components/common/LeftSide";
// import IndivTask from "../components/common2/IndivTask";
import styles from "./IdeaPage.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from '@mui/system';

const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.greenary.main,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <LeftSide />
      <div className={styles.BoardContainer}>
        <div className={styles.BoardTabContainer}>
          <CustomTabs
            textColor="inherit"
            sx={{ fontFamily: "preRg"}}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontFamily: "preBd" }}
              label="아이디어 및 자료"
              {...a11yProps(0)}
            />
            <Tab sx={{ fontFamily: "preBd" }} label="에러" {...a11yProps(1)} />
          </CustomTabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.ideaNshare}>
            <Idea />
            <Share />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ErrorBoard />
        </CustomTabPanel>
      </div>
    </div>
  );
}
