import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styles from "./Share.module.css";
import IndivTask from "../common2/IndivTask"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// import pin from '../../assets/pin.png'

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

export default function Share() {
  
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>([
    { id: 1, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
    { id: 2, isChecked: false, content: '밥 맛깔나게 먹기! 밥 맛깔나게 먹기!밥 맛깔나게 먹기! 밥 맛깔나게 먹기!밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기! 밥 맛깔나게 먹기!', isEditing:false },
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

// const removeCheckbox = (id:number) => () =>{
//   setCheckboxItems((prevItems) =>
//     prevItems.filter((item) => item.id !== id)
//     );
// }

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
    {/* <h2 style={{marginLeft:'10px',fontFamily:'preBd',margin: '0', textAlign:'center',alignItems:'center',display:'flex', justifyContent:'center'}}>자료공유</h2> */}
  <Box sx={{p:0,}}>
    <Grid container spacing={2}>
    {checkboxItems.map(item=>(
      <Grid item xs={12} key={item.id}>
        <Item sx={{margin:'0 10px', padding:0, minHeight: '20px'}} className={styles.oneMemo} elevation={7}>
          <div className={styles.indivTask}>
            {/* <Checkbox 
            sx={{color:'#39A789','&.Mui-checked':{color:'#39A789'}}} 
            style={{height:'20px',margin:'14px 0'}}
            checked ={item.isChecked}
            onChange ={handleCheckboxChange(item.id)}
            /> */}
            {item.isEditing?
            <input style={{fontFamily:'preRg',height: '30px', marginTop: '8px', border:'none'}} type="text" onBlur ={handleContentChange(item.id)} placeholder="내용을 입력하세요"/> :
            <p className={`${styles.taskContent} ${item.isChecked? styles.checked:''}`}>
              {item.content}
            </p>}
          </div>
        {/* <Button sx={{marginBottom:'20px',fontFamily:'preRg'}} color="greenary" size="small" variant="contained">관련 대화로 이동</Button> */}
        {/* <Button sx={{marginLeft: '5px', marginBottom:'20px',fontFamily:'preRg'}} color="error" size="small" onClick={() => removeCheckbox(item.id)} variant="contained">삭제</Button> */}
        </Item>
      </Grid>
    ))}
    </Grid>
  </Box>

  <Fab sx={{ mt: '15px', mb: '20px', mr: 'auto', ml: 'auto', display:'flex',justifyContent:'center' }} color="greenary" aria-label="add" onClick={addCheckbox}>
  <AddIcon/>
  </Fab>
</div>  
);
}