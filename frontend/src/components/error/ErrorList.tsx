import React from "react";
import ErrorCard from "./ErrorCard";

interface ErrorListProps {
  errors: any;
  onErrorCardClick: any;
}

function ErrorList({ errors, onErrorCardClick }: ErrorListProps) {
  return (
    <div
      style={{
        height: "450px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {errors.map((error: any, index: number) => (
        <ErrorCard key={index} error={error} onCardClick={onErrorCardClick} />
      ))}
    </div>
  );
}

export default ErrorList;
