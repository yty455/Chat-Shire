import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Autocomplete, TextField } from "@mui/material";

import { COLUMN_NAMES } from "../reactDnd/Contants";
import MovableItem from "../reactDnd/MovableItem";
import Column from "../reactDnd/Column";

import styles from "./SetMember.module.css";

import api from "../../utils/api";
import { tasks } from "../reactDnd/Tasks";

function SetMember({ onData }: { onData: (membersData: string[]) => void }) {
  const [items, setItems] = useState(tasks);
  const [invitedMembers, setInvitedMembers] = useState();

  console.log(items)

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState: any) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };

  const searchMember = (e: any) => {
    api.get(`/users/search?githubId=${e.target.value}`)
    .then((res) => {
      let prevItem = res?.data.result[0]
      prevItem.map((item: any) => {
        if (item.column === "초대된 멤버") {
        } else {
          item.column = MEMBERS
        }
      })
      if (prevItem) {
        setItems(prevItem)
      }
    });
  };

  const returnItemsForColumn = (columnName: string) => {
    if (columnName === "초대된 멤버") {
      const newMembers: any = items
        .map((member) => {
          if (member.column === "초대된 멤버") {
            return String(member.id);
          }
        })
        .filter((element) => element);
      onData(newMembers);
    }
    
    return items
      .filter((item: any) => item.column === columnName)
      .map((item: any, index: any) => (
        <MovableItem
          key={item.id}
          id={item.id}
          githubId={item.githubId}
          nickname={item.nickname}
          position={item.position}
          profileColor={item.profileColor}
          profileImage={item.profileImage}
          setItems={setItems}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { MEMBERS, INVITED_MEMBERS } = COLUMN_NAMES;

  console.log(MEMBERS, INVITED_MEMBERS)

  useEffect(() => {
    api.get("/users/search?githubId=")
    .then((res) => {
      let prevItem = res?.data.result[0]
      prevItem.map((item: any) => {
        if (item.column === "초대된 멤버") {
        } else {
          item.column = MEMBERS
        }
      })
      if (prevItem) {
        setItems(prevItem)
      }
    });
  }, [])

  return (
    <div
      className={styles.MemberInviteContainer}
      style={{ border: "none", width: "600px" }}
    >
      <DndProvider backend={HTML5Backend}>
        <div>
          <TextField
            onChange={searchMember}
            style={{ width: "280px" }}
            color="greenary"
            label="Git ID로 검색해보세요"
          />
          <Column title={MEMBERS} className={styles.MemberListContainer}>
            {returnItemsForColumn(MEMBERS)}
          </Column>
        </div>
        <div>
          <Column
            title={INVITED_MEMBERS}
            className={styles.InvitedMemberListContainer}
          >
            {returnItemsForColumn(INVITED_MEMBERS)}
          </Column>
        </div>
      </DndProvider>
    </div>
  );
}

export default SetMember;
