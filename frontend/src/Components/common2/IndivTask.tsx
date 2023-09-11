import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import styles from './IndivTask.module.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function SimpleContainer() {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.indivDiv}>

      <div className={styles.test}>
        <div className={styles.indivTask}>
          <Checkbox sx={{color: '#39A789','&.Mui-checked': {color: '#39A789',},}} 
            style={{height: '20px',margin:'17px 0'}} 
            checked={isChecked}
            onChange={handleCheckboxChange}/>
          <p className={`${styles.taskContent} ${isChecked ? styles.checked : ''}`}>
          밥 맛깔나게 먹기! 밥 맛깔나게 먹기!
        </p>
        </div>
        <Button sx={{marginBottom: '20px', fontFamily:'preRg'}} color="success" size="small" variant="contained">관련 대화로 이동</Button>
      </div>

      <div className={styles.test}>
        <div className={styles.indivTask}>
          <Checkbox sx={{color: '#39A789','&.Mui-checked': {color: '#39A789',},}} 
            style={{height: '20px',margin:'17px 0'}} 
            checked={isChecked}
            onChange={handleCheckboxChange}/>
          <p className={`${styles.taskContent} ${isChecked ? styles.checked : ''}`}>
          밥 맛깔나게 먹기! 밥 맛깔나게 먹기!
        </p>
        </div>
        <Button sx={{marginBottom: '20px', fontFamily:'preRg'}} color="success" size="small" variant="contained">관련 대화로 이동</Button>
      </div>

      <Fab color="success" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}