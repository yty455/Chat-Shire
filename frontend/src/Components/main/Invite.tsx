import React from "react";
import Container from "../common/Container";
import InviteCard from "./InviteCard";
import styles from "./invite.module.css";

const invite = [
  { pjt: 1, people: "csi" },
  { pjt: 2, people: "sic" },
  { pjt: 3, people: "ics" },
];

function Invite() {
  return (
    <Container
      backgroundColor="white"
      text=""
      width="400px"
      height="85vh"
      margin="60px 40px 40px 10px"
      padding=""
      borderRadius="20px"
      boxShadow="0 8px 10px 0 rgba(131, 131, 131, 0.37)"
      backdropFilter="blur(7px)"
      transition="all 0.2s ease-in-out"
    >
      <h5 style={{ marginTop: "20%", textAlign: "center" }}>초대함</h5>
      {invite.map((invi: any) => (
        <InviteCard key={invi.pjt} invite={invi} />
      ))}
    </Container>
  );
}

export default Invite;
