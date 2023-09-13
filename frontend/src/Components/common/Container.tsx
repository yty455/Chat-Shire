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
  };

  return (
    <div style={boxStyle}>
      {children}
      <p>{text}</p>
    </div>
  );
};

export default Container;
