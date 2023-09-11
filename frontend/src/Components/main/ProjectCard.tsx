import React from "react";
import styles from "./ProjectCard.module.css";
import ProfileImgBox from "../common/ProfileImgBox";
import img from "../../assets/profile/m57.png";

interface ProjectCardProps {
  pjt: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ pjt }) => {
  return (
    <div className={styles.card}>
      <h3>{pjt.name}</h3>
      <p>{pjt.content}</p>
      <br />
      <br />
      <div className={styles.memberbox}>
        {pjt.member.map((mem: any, index: number) => (
          <div key={index}>
            <ProfileImgBox
              backgroundColor="red"
              text=""
              width="25px"
              height="25px"
              margin="10px"
              padding=""
              display="flex"
              backgroundImage={img}
            ></ProfileImgBox>
            {/* {mem} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
