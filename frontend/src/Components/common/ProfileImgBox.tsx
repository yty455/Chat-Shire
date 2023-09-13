import React from "react";

interface ProfileImgBoxProps {
  backgroundColor: string;
  text?: string;
  width: string;
  height: string;
  margin: string;
  padding: string;
  boxShadow?: string;
  children?: React.ReactNode;
  display?: string;
  justifyContent?: string;
  backgroundImage?: any;
}

const ProfileImgBox: React.FC<ProfileImgBoxProps> = ({
  backgroundColor,
  text,
  width,
  height,
  margin,
  padding,
  boxShadow,
  children,
  display,
  backgroundImage,
  justifyContent,
}) => {
  const boxStyle = {
    backgroundColor,
    width,
    height,
    margin,
    padding,
    borderRadius: "50%",
    boxShadow,
    display,
    justifyContent,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
  };

  return (
    <div style={boxStyle}>
      {children}
      <p>{text}</p>
    </div>
  );
};

export default ProfileImgBox;
