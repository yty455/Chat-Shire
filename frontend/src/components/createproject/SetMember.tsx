import React, { useEffect, useState } from 'react'
import styles from './SetMember.module.css'

import Checkbox from '@mui/material/Checkbox';
import {BsCircle, BsCheckCircleFill} from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'

import api from '../../utils/api'

export default function SetMember({ onData }: { onData: (membersData: string[]) => void }) {
  const [invitedMembers, setInvitedMembers] = useState<string[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [searchResult, setSearchResult] = useState<any[]>([
    { id: 1,
      githubId: "dfsdf56451",
      nickname: "가영",
      position: "ㄴ",
      profileColor: "#abb8c3",
      profileImage: "/assets/profile/male/m9.png",
    },
  ])
  const [searchResultLength, setSearchResultLength] = useState(0)

  const handleSearchInput = (e: any) => {
    console.log(e.target.value)
    api.get('users/search?githubId=' + e.target.value)
    .then((res) => {
      setSearchResult(res.data.result[0])
      setSearchResultLength(res.data.result[0].length)
    })
    .catch(err => console.log(err))
  }

  const handleInviteBtnChange = (e: any) => {
    if (e.target.checked) {
      const newMembers = [...members, {id: String(e.target.id), profileImage: e.target.value, profileColor: e.target.name}]
      const newInvitedMembers = [...invitedMembers, String(e.target.id)]

      setMembers(newMembers)
      setInvitedMembers(newInvitedMembers)
    } else {
      const newMembers = members.filter(item => item.id !== String(e.target.id))
      const newInvitedMembers = invitedMembers.filter(item => item !== String(e.target.id))

      setMembers(newMembers)
      setInvitedMembers(newInvitedMembers)
    }
  }

  const ReturnInvitedMembers = members.map((item: any) => (
    <div style={{width: "60px", height: "60px", borderRadius: "100px", backgroundColor: item.profileColor}}>
      <img style={{width: "60px", height: "60px"}} src={process.env.PUBLIC_URL + item.profileImage} alt="" />
    </div>
  ))

  const searchResultItem = searchResult.map((item: any) => {
    return (
      <div className={styles.SearchResultItem}>
        <div style={{display: "flex", alignItems: "center"}}>
          <div style={{width: "50px", height: "50px", borderRadius: "100px", backgroundColor: item.profileColor}}>
            <img style={{width: "50px", height: "50px"}} src={process.env.PUBLIC_URL + item.profileImage} alt="" />
          </div>
          <div style={{display: "flex", flexDirection: "column", marginLeft: "6px"}}>
            <span style={{fontFamily: "preRg", fontSize: "14px"}}>{item.githubId}</span>
            <span style={{fontFamily: "preRg", fontSize: "14px"}}>{item.nickname}</span>
          </div>
        </div>
        { 
          invitedMembers.includes(String(item.id)) ?
          <Checkbox defaultChecked id={item.id} value={ item.profileImage } name={ item.profileColor } onClick={handleInviteBtnChange} style={{marginLeft: "280px"}} icon={<BsCircle size={26}/>} checkedIcon={<BsCheckCircleFill size={26}/>} />  : 
          <Checkbox id={item.id} value={ item.profileImage } name={ item.profileColor } onClick={handleInviteBtnChange} style={{marginLeft: "280px"}} icon={<BsCircle size={26}/>} checkedIcon={<BsCheckCircleFill size={26}/>} />
        }
      </div>
    )}
  )

  useEffect(() => {
    onData(invitedMembers)
  }, [invitedMembers])

  return (
    <div className={styles.SetMemberContainer}>
      <div className={styles.InvitedMembersContainer}>
        {ReturnInvitedMembers}
      </div>
      <div className={styles.SearchInputContainer}>
        <GoSearch size={16}/>
        <input className={styles.SearchInput} placeholder='Github ID 검색' type="text" onChange={handleSearchInput}/>
      </div>
      <div className={styles.SearchResultContainer}>
        <span style={{fontFamily: "preLt", fontSize: "14px"}}>검색 결과 : {searchResultLength}</span>
        <div className={styles.SearchResultItemContainer}>
          {searchResultItem}
        </div>
      </div>
    </div>
  )
}
