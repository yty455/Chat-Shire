import { useDrop } from "react-dnd";

import { ITEM_TYPE } from "./Contants";
import { ColumnProps } from "./Types";

const Column = ({ children, className, title }: ColumnProps) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: () => ({ name: title }),
  });

  return (
    <div ref={drop} className={className}>
      {title === "초대된 멤버" ? <div style={{minHeight: "30px"}}><span style={{fontFamily: "preBd", fontSize: "18px", color: "#575757"}}>{title}</span></div> : null}      
      {children}
    </div>
  );
};

export default Column;