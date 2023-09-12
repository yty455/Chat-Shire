import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface CardType {
  id: number;
  text: string;
}

interface Item {
  type: string;
  id: number;
  index: number;
  text: string;
}

interface CardProps {
  id: number;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const ItemTypes = {
  CARD: "card",
};

export const Card: React.FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
}: CardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<Item, void, { isOver: boolean }>({
    accept: ItemTypes.CARD,
    drop: () => {
      // This function is needed, even if it's empty, to enable dropping.
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    Item,
    void,
    {
      isDragging: boolean;
    }
  >({
    type: ItemTypes.CARD,
    item: () => ({
      type: ItemTypes.CARD,
      id,
      index,
      text,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={id}>
      {text}
    </div>
  );
};

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
