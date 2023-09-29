import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemState } from "./Types";
import { COLUMN_NAMES, ITEM_TYPE } from "./Contants";

import styles from "./MovableItem.module.css";

const MovableItem = ({ id, githubId, nickname, position, profileColor, profileImage, moveCardHandler, setItems }: any) => {
  const changeItemColumn = (currentItem: any, columnName: string) => {
    setItems((prevState: ItemState[]) =>
      prevState.map((e: ItemState) => {
        return {
          ...e,
          column: e.githubId === currentItem.githubId ? columnName : e.column,
        };
      })
    );
  };

  const ref = useRef<HTMLDivElement>(null);

  // 마우스가 hover item 높이의 절반을 넘을 경우에만 이동을 수행하도록 설계
  // - 아래로 드래그할 때 커서가 50% 이하일 때만 이동
  // - 위로 드래그할 때 커서가 50% 이상일 때만 이동
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: { id: number; githubId: string }, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.id;
      const hoverIndex = id;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // 아래로 드래깅
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 위로 드래깅
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCardHandler(dragIndex, hoverIndex);
      item.id = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, githubId },
    end: (item, monitor) => {
      console.log(item)
      const dropResult: any = monitor.getDropResult();
      console.log(dropResult)
      if (dropResult) {
        const { name } = dropResult;
        const { MEMBERS, INVITED_MEMBERS } = COLUMN_NAMES;
        switch (name) {
          case MEMBERS:
            changeItemColumn(item, MEMBERS);
            break;
          case INVITED_MEMBERS:
            changeItemColumn(item, INVITED_MEMBERS);
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className={styles.MemberItemContainer} style={{ opacity }}>
      <div className={styles.MemberItemAvatar}></div>
      {githubId}
    </div>
  );
};

export default MovableItem;
