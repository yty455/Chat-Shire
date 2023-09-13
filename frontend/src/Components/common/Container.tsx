import React from "react";

interface ContainerProps {
  backgroundColor: string;
  text: string;
  width: string;
  height: string;
  margin: string;
  padding: string;
  borderRadius: string;
  boxShadow: string;
  children?: React.ReactNode;
  display?: string;
  justifyContent?: string;
  backdropFilter?: string;
  transition?: string;
}

const Container: React.FC<ContainerProps> = ({
  backgroundColor,
  text,
  width,
  height,
  margin,
  padding,
  borderRadius,
  boxShadow,
  children,
  display,
  justifyContent,
  backdropFilter,
  transition,
}) => {
  const boxStyle = {
    backgroundColor,
    width,
    height,
    margin,
    padding,
    borderRadius,
    boxShadow,
    display,
    justifyContent,
    WebkitBackdropFilter: backdropFilter,
    transition,
    "&:hover": {
      boxShadow: "-2px -2px 5px white, 2px 2px 5px #babecc",
    },
  };

  return (
    <div style={boxStyle}>
      {children}
      <p>{text}</p>
    </div>
  );
};

export default Container;
