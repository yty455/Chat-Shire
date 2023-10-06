import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Idea from "../components/idea/Idea";
import Share from "../components/idea/Share";
import ErrorBoard from "../components/error/ErrorBoard";
import LeftSide from "../components/common/LeftSide";
import ErrorCreate from "../components/error/ErrorCreate";
import styles from "./IdeaPage.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";

const CustomTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
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
  const { projectId } = useParams();
  const projectToPass = projectId || "defaultProjectId";
  const [value, setValue] = React.useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIsCreating(false);
  };

  return (
    <div className={styles.container}>
      <LeftSide />
      <div className={styles.BoardContainer}>
        <div className={styles.BoardTabContainer}>
          <CustomTabs
            textColor="inherit"
            sx={{ fontFamily: "preRg" }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontSize: "18px", fontFamily: "preBd" }}
              label="아이디어 및 자료공유"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontSize: "18px", fontFamily: "preBd" }}
              label="에러"
              {...a11yProps(1)}
            />
          </CustomTabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.ideaNshare}>
            <Idea pjtId={projectToPass} />
            <Share pjtId={projectToPass} />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {isCreating ? (
            <ErrorCreate pjtId={projectToPass} setIsCreating={setIsCreating} />
          ) : (
            <ErrorBoard
              pjtId={projectToPass}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
            />
          )}
        </CustomTabPanel>
      </div>
    </div>
  );
}
