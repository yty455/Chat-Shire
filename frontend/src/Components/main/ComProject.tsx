import React from "react";
import ProjectCard from "./ProjectCard";
import styles from "./ComProject.module.css";

interface ComProjectProps {
  compjt: Array<object>;
}

const ComProject: React.FC<ComProjectProps> = ({ compjt }) => {
  return (
    <div>
      <h3 className={styles.pjttxt}>완료된 PJT</h3>
      <div className={styles.comCardBox}>
        {compjt.map((pjt: any) => (
          <ProjectCard key={pjt.id} pjt={pjt} />
        ))}
      </div>
    </div>
  );
};

export default ComProject;
