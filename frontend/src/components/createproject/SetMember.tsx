import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Autocomplete, TextField } from "@mui/material";

import { tasks } from "../reactDnd/Tasks";
import { COLUMN_NAMES } from "../reactDnd/Contants";
import MovableItem from "../reactDnd/MovableItem";
import Column from "../reactDnd/Column";

import styles from "./SetMember.module.css";

import api from "../../utils/api";

function SetMember({ onData }: { onData: (membersData: string[]) => void;}) {
  const [items, setItems] = useState(tasks);
  const [members, setMembers] = useState<string[]>([])
  const searchResult = [
    {
      id: 1,
      githubId: "kdu201"
    }
  ]

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
      console.log(res)
    })
  }

  const returnItemsForColumn = (columnName: string) => {
 
    if (columnName === "초대된 멤버") {
      console.log(items.filter((item: any) => item.column === "초대된 멤버"))
    }

    return items
      .filter((item: any) => item.column === columnName)
      .map((item: any, index: any) => (
        <MovableItem key={item.id} name={item.name} setItems={setItems} index={index} moveCardHandler={moveCardHandler}/>
      ));
  };

  const { MEMBERS, INVITED_MEMBERS } = COLUMN_NAMES;

  return (
    <div className={styles.MemberInviteContainer} style={{ border: "none", width: "600px" }}>
      <DndProvider backend={HTML5Backend}>
        <div>
          <TextField onChange={searchMember} style={{width: "280px"}} color="greenary" label="Git ID로 검색해보세요" />
          <Column title={MEMBERS} className={styles.MemberListContainer}>
            {returnItemsForColumn(MEMBERS)}
          </Column>
        </div>
        <div>
          <Column title={INVITED_MEMBERS} className={styles.InvitedMemberListContainer}>
            {returnItemsForColumn(INVITED_MEMBERS)}
          </Column>
        </div>
      </DndProvider>
    </div>
  );
}

export default SetMember;
