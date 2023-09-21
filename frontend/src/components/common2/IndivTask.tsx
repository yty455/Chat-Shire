import React, { useState, useEffect } from "react";
import styles from "./IndivTask.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { getTask } from "../../utils/taskApi";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, Select } from 'antd';
import './IndivTask.css'

type CheckboxItem = {
  id: number;
  isChecked: boolean;
  content: string;
  isEditing: boolean;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "110px",
}));

interface SimpleContainerProps {
  projectId?: string;
}

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const priorityHandleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default function SimpleContainer({ projectId }: SimpleContainerProps) {
  //   const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([
  //     { id: 1, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
  //     { id: 2, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!밥 맛깔나게 먹기! 밥 맛깔나게 먹기!밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
  //     { id: 3, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
  //     // ...
  // ]);

  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleCheckboxChange = (id: number) => () => {
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const getInTask = async () => {
    try {
      if (projectId) {
        const response = await getTask(projectId);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInTask();
  }, []);

  const addCheckbox = () => {
    const newId = checkboxItems.length + 1;
    setCheckboxItems([
      ...checkboxItems,
      { id: newId, isChecked: false, content: "", isEditing: true },
    ]);
  };

  const handleDelete = (id: number) => {
    setCheckboxItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleContentChange = (id: number) => (event: any) => {
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, content: event.target.value, isEditing: false }
          : item
      )
    );
  };

  const handleKeyPress = (id: number) => (event: any) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        window.alert("내용을 입력해주세요");
      } else {
        setCheckboxItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? { ...item, content: event.target.value, isEditing: false }
              : item
          ));
      }}};

  return (
    <div className={styles.indivDiv}>
      <Box sx={{ p: 0, pt: 1 }}>
        <Grid container spacing={2}>
          {checkboxItems && checkboxItems.length !== 0 ? (
            checkboxItems.map((item) => (
              <Grid sx={{ margin: 0, padding: 0 }} item xs={12} key={item.id}>
                <Item
                  sx={{
                    borderRadius: "0px 20px 20px 20px",
                    margin: "0 10px",
                    padding: 0,
                    minHeight: "30px",
                  }}
                  className={styles.oneMemo}
                  elevation={7}
                >
                  <div className={styles.indivTask}>
                    <Checkbox
                      sx={{
                        color: "#39A789",
                        "&.Mui-checked": { color: "#39A789" },
                      }}
                      style={{ height: "20px", margin: "14px 0" }}
                      checked={item.isChecked}
                      onChange={handleCheckboxChange(item.id)}
                    />
                    {item.isEditing ? (
                      <input
                        onKeyPress={handleKeyPress(item.id)}
                        style={{
                          fontFamily: "preRg",
                          height: "30px",
                          marginTop: "9px",
                          border: "none",
                        }}
                        type="text"
                        onBlur={handleContentChange(item.id)}
                        placeholder="내용을 입력하세요"
                      />
                    ) : (
                      <p
                        className={`${styles.taskContent} ${
                          item.isChecked ? styles.checked : ""
                        }`}
                      >
                        {item.content}
                      </p>
                    )}
                  </div>
                  <div className={styles.icons}>
                    <div style={{margin:'-4px 0 0 0'}}>
                      <DatePicker style={{margin: '-8px 0 10px 7px', height: 24, fontFamily:'preRg', width:'110px'}} size="small" bordered={false} placeholder="마감일 선택" onChange={onChange} />
                      <Select
                        bordered={false} 
                        defaultValue="🔴"
                        style={{ padding: 0, width: 62, height: 24, margin: '-15px 0 10px 0' }}
                        onChange={priorityHandleChange}
                        options={[
                          { value: 'HIGH', label: '🔴' },
                          { value: 'MIDDLE', label: '🟡' },
                          { value: 'LOW', label: '🟢' },
                        ]}
                      />
                    </div>
                    <div>
                    <BsFillChatDotsFill
                      style={{ fontSize: "17px", margin: "-5px 5px 10px 0" }}
                    />
                    <BsPencilFill
                      style={{ fontSize: "17px", margin: "-5px 3px 10px 0" }}
                    />
                    <MdDelete
                      style={{ fontSize: "20px", margin: "-7px 10px 10px 0" }}
                      onClick={() => handleDelete(item.id)}
                    />
                    </div>
                  </div>
                  {/* <AiFillDelete style={{fontSize: '24px', margin: '0px 5px 20px 0', paddingTop: '-3px'}} onClick={() => handleDelete(item.id)} /> */}
                  {/* <Button sx={{margin: '0 5px 20px 0' ,fontFamily:'preRg'}} color="greenary" size="small" variant="contained">관련 대화로 이동</Button>
            <Button sx={{margin: '0 5px 20px 0',fontFamily:'preRg'}} color="primary" size="small" variant="contained">수정</Button>
            <Button onClick={() => handleDelete(item.id)} sx={{margin: '0 0 20px 0',fontFamily:'preRg'}} color="error" size="small" variant="contained">삭제</Button> */}
                </Item>
              </Grid>
            ))
          ) : (
            <p
              style={{
                color: "grey",
                fontFamily: "preBd",
                margin: "30px auto 0 auto",
                paddingLeft: "10px",
              }}
            >
              아직 등록된 태스크가 없습니다.
            </p>
          )}
        </Grid>
      </Box>
      <Fab
        sx={{
          mb: "20px",
          mt: "20px",
          mr: "auto",
          ml: "auto",
          display: "flex",
          justifyContent: "center",
        }}
        color="greenary"
        aria-label="add"
        onClick={addCheckbox}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
