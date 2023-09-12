import React, { useEffect } from 'react'
import styles from './RightSearchTab.module.css'
import TextField from '@mui/material/TextField';
import ReactDOM from 'react-dom/client';

export default function RightSearchTab() {

  useEffect(() => {
    const container = ReactDOM.createRoot(
      document.getElementById('container') as HTMLElement
    );
    container.render(React.createElement('div', {class: 'gcse-search'}))
  }, []) 

  return (
    <div className={styles.MessageRightBody}>
      <span className={styles.MessageRightBodyTitle}>
        검색
      </span>
      <div id="container" className={styles.GoogleSearchContainer}>
      </div>
    </div>
  )
}

