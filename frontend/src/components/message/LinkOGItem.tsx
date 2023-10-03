import React, { useState } from 'react'
import axios from 'axios'
import styles from './LinkOGItem.module.css'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


export default function LinkOGItem() {
  const [ title, setTitle ] = useState(null)
  const [ desc, setDesc ] = useState(null)
  const [ domain, setDomain ] = useState(null)
  const [ favicon, setFavicon ] = useState(null)

  // const requestUrl = "https://www.npmjs.com/package/@dhaiwat10/react-link-preview"
  const requestUrl = "https://www.naver.com"

  const url = `https://jsonlink.io/api/extract?url=${requestUrl}`

  axios.get(url)
  .then((res) => {
    setTitle(res.data.title)
    setDesc(res.data.description)
    setDomain(res.data.domain)
    setFavicon(res.data.images[0])
  })

  function handleClick() {
    window.open(requestUrl, '_blank')
  }
  
  return (
    <Card sx={{ boxShadow: "none", borderRadius: 2, marginTop: 2}} onClick={handleClick}>
      {favicon ? 
        <CardActionArea sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", height: 100, borderRadius: 2, border: "1px solid #E5E8EB", boxShadow: "none", padding: 2 }}>
          <span className={styles.BookMarkTitle}>{title}</span>
          <span className={styles.BookMarkDesc}>{desc}</span>
          <div className={styles.BookMarkLink}>
            <img className={styles.BookMarkFavicon} src={`${favicon}`} alt={`${title}`} />
            <span>{domain}</span>
          </div>
        </CardActionArea> :
        <CardActionArea sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", height: 100, borderRadius: 2, border: "1px solid #E5E8EB", boxShadow: "none", padding: 2 }}>
          <Skeleton animation="wave" style={{width: "140px", height: "46px"}} />
          <Skeleton animation="wave" style={{width: "260px", height: "30px"}} />
          <Skeleton animation="wave" style={{width: "200px", height: "20px"}} />
        </CardActionArea>
      }
    </Card>
  )
}
