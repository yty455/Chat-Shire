import React, { useState } from 'react';
import styles from './IndivTask.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type CheckboxItem = {
  id: number;
  isChecked: boolean;
  content: string;
  isEditing: boolean; 
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: '110px'
}));

export default function SimpleContainer() {
  
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([
    { id: 1, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
    { id: 2, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!밥 맛깔나게 먹기! 밥 맛깔나게 먹기!밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
    { id: 3, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
    // ...
]);

const handleCheckboxChange = (id:number) => () =>{
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {...item,isChecked:!item.isChecked}
          : item)
      );
}

const addCheckbox = () => {
    const newId = checkboxItems.length + 1;
    setCheckboxItems([...checkboxItems, { id:newId , isChecked:false,content:'',isEditing:true }]);
}

const handleContentChange = (id:number) => (event:any) =>{
    setCheckboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {...item,content:event.target.value,isEditing:false}
          : item)
      );
}

return (
  <div className={styles.indivDiv}>
    <Box sx={{p: 0, pt: 1}}>
      <Grid container spacing={2}>
      {checkboxItems.map(item=>(
        <Grid sx={{margin: 0, padding:0 }} item xs={12} key={item.id}>
          <Item sx={{margin:'0 10px', padding:0, minHeight: '30px'}} className={styles.oneMemo} elevation={7}>
            <div className={styles.indivTask}>
              <Checkbox 
              sx={{color: '#39A789', '&.Mui-checked': { color: '#39A789'}}} 
              style={{height:'20px',margin:'14px 0'}}
              checked ={item.isChecked}
              onChange ={handleCheckboxChange(item.id)}
              />
              {
                item.isEditing ?
                <input style={{fontFamily:'preRg',height: '30px', marginTop: '9px', border:'none'}} type="text" onBlur={handleContentChange(item.id)} placeholder="내용을 입력하세요"/> :
                <p className={`${styles.taskContent} ${item.isChecked? styles.checked:''}`}>
                  {item.content}
                </p>
              }
            </div>
            <Button sx={{marginTop: 0, marginBottom:'20px',fontFamily:'preRg'}} color="greenary" size="small" variant="contained">관련 대화로 이동</Button>
          </Item>
        </Grid>
      ))}
      </Grid>
    </Box>
    <Fab sx={{ mb: '10px', mt: '20px', mr: 'auto', ml: 'auto', display:'flex',justifyContent:'center' }} color="greenary" aria-label="add" onClick={addCheckbox}>
    <AddIcon/>
    </Fab>
  </div>  
);
}