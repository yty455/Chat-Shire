import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import styles from './IndivTask.module.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function SimpleContainer() {
  return (
    <div className={styles.indivDiv}>
      {/* map */}
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

      <div className={styles.indivTask}>태스크 fasdfasdfasdfasdfasdfasdfsdfasdfsfsdasdasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfads1</div>
    </div>
    // <Box className={styles.indivDiv} sx={{ bgcolor: '#cfe8fc', height: '100vh', width: '400px'}} />
  );
}