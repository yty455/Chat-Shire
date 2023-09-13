import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TeamTask from '../components/common2/TeamTask'
import IndivTask from '../components/common2/IndivTask'
import LeftSideTab from '../components/common/LeftSideTab';

export default function Test() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <LeftSideTab/>
      <TeamTask/>
      <IndivTask/>
    </div>
  );
}