import { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Autocomplete, TextField } from "@mui/material";

import { COLUMN_NAMES } from "../reactDnd/Contants";
import MovableItem from "../reactDnd/MovableItem";
import Column from "../reactDnd/Column";

import styles from "./SetMember.module.css";

import api from "../../utils/api";
import { tasks } from "../reactDnd/Tasks";
import { initialMember_recoil, memberSearchResult_recoil } from "../../stores/atom";
import { useRecoilState } from "recoil";

function SetMember({ onData }: { onData: (membersData: string[]) => void }) {
  const [items, setItems] = useState(tasks);
  let invitedItems = useRef<any[]>(tasks);
  let InvitedMembers = useRef<string[]>([]);

  console.log(items);

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
    api.get(`/users/search?githubId=${e.target.value}`).then((res) => {
      let prevItem = res?.data.result[0];
      prevItem.map((item: any) => {
        if (InvitedMembers.current.includes(String(item.id))) {
          item.column = INVITED_MEMBERS;
        } else {
          item.column = MEMBERS;
        }
      });
      if (prevItem) {
        setItems(prevItem);
      }
    });
  };

  const returnItemsForColumn = (columnName: string) => {
    const searchTextField = document.getElementById("searchTextField") as HTMLInputElement

    console.log(searchTextField?.value)

    if (searchTextField?.value !== undefined) {
      invitedItems.current = items
    }

    if (columnName === "초대된 멤버") {
      const newMembers: any = items
        .map((member) => {
          if (member.column === "초대된 멤버") {
            InvitedMembers.current.push(String(member.id));
            return String(member.id);
          }
        })
        .filter((element) => element);
      onData(newMembers);

      return invitedItems.current
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
    } else {
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
    }
  };

  const { MEMBERS, INVITED_MEMBERS } = COLUMN_NAMES;

  console.log(MEMBERS, INVITED_MEMBERS);

  useEffect(() => {
    api.get("/users/search?githubId=").then((res) => {
      let prevItem = res?.data.result[0];
      prevItem.map((item: any) => {
        if (InvitedMembers.current.includes(String(item.id))) {
          item.column = INVITED_MEMBERS;
        } else {
          item.column = MEMBERS;
        }
      });
      if (prevItem) {
        setItems(prevItem);
      }
    });
  }, []);

  return (
    <div
      className={styles.MemberInviteContainer}
      style={{ border: "none", width: "600px" }}
    >
      <DndProvider backend={HTML5Backend}>
        <div>
          <TextField
            id="searchTextField"
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