import React from "react";
import ErrorCard from "./ErrorCard";

interface ErrorListProps {
  onErrorCardClick: any;
}

function ErrorList({ onErrorCardClick }: ErrorListProps) {
  return (
    <div
      style={{
        height: "calc(100% - 80px)",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ErrorCard onCardClick={onErrorCardClick} />
      <ErrorCard onCardClick={onErrorCardClick} />
      <ErrorCard onCardClick={onErrorCardClick} />
      <ErrorCard onCardClick={onErrorCardClick} />
    </div>
  );
}

export default ErrorList;
