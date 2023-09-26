import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { tasks } from "../reactDnd/Tasks";
import { COLUMN_NAMES } from "../reactDnd/Contants";
import MovableItem from "../reactDnd/MovableItem";
import Column from "../reactDnd/Column";

import styles from "./Fourth.module.css";

function Fourth() {
  const [items, setItems] = useState(tasks);

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

  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item: any) => item.column === columnName)
      .map((item: any, index: any) => (
        <MovableItem
          key={item.id}
          name={item.name}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { MEMBERS, INVITED_MEMBERS } = COLUMN_NAMES;

  return (
    <div className={styles.MemberInviteContainer}>
      <DndProvider backend={HTML5Backend}>
        <div>
          <input
            style={{ width: "234px", height: "14px" }}
            type="text"
            placeholder="Git-Id를 검색 해보세요"
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

export default Fourth;
