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

  // og(url, function (err, meta) {
  //   console.log(meta);
  // });

  return (
    <Container
      backgroundColor="white"
      text=""
      width="20vw"
      height="85vh"
      margin="0vh 0vw 0vh 1vw"
      padding=""
      border="1px solid #E5E8EB"
      borderRadius="20px"
      boxShadow=""
      backdropFilter=""
      transition=""
    >
      <h5 style={{ marginTop: "20%", textAlign: "center" }}>초대함</h5>
      {invite.map((invi: any) => (
        <InviteCard key={invi.pjt} invite={invi} />
      ))}
    </Container>
  );
}

export default Invite;
