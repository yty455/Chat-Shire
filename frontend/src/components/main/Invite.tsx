import React from "react";
import Container from "../common/Container";
import InviteCard from "./InviteCard";
import styles from "./invite.module.css";

const invite = [
  { pjt: 1, people: "csi" },
  { pjt: 2, people: "sic" },
  { pjt: 3, people: "ics" },
];
const url = "https://namu.wiki/w/%EC%82%AC%ED%83%95";
const fa = "http://www.google.com/s2/favicons?domain=";

function Invite() {
  const url =
    "http://github.com/samholmes/node-open-graph/raw/master/test.html";

  return (
    <div className={styles.InviteContainer}>
      <span className={styles.InviteTitle}>초대함</span>
      {invite.map((invi: any) => (
        <InviteCard key={invi.pjt} invite={invi} />
      ))}
    </div>
  );
}

export default Invite;
