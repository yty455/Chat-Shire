import React from 'react'
import styles from './MessageRightBody.module.css'
import RightMediaTab from './RightMediaTab'
import RightFileTab from './RightFileTab'
import RightSearchTab from './RightSearchTab'
import RightLinkTab from './RightLinkTab'

interface Props {
  value: string
}

const MessageRightBody: React.FC<Props>= ({ value }) => {
  if ( value === "photos") {
    return (
      <RightMediaTab/>
    )
  } else if ( value === "files") {
    return (
      <RightFileTab/>
    )
  } else if ( value === "links") {
    return (
      <RightLinkTab/>
    )
  } else if ( value === "search") {
    return (
      <RightSearchTab/>
    )
  } else {
    return (
      <span>Loading...</span>
    )
  }
  
}

export default MessageRightBody;