import React from "react";
import Container from "../common/Container";
import InviteCard from "./InviteCard";
import styles from "./invite.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const invite = [
  { pjt: 1, people: "csi" },
  { pjt: 2, people: "sic" },
  { pjt: 3, people: "ics" },
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
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        direction={'vertical'}
        grabCursor={true}
        className={styles.InvitationItemContainer}
      >
        {invite.map((invi: any) => (
          <SwiperSlide className={styles.SwiperItem}>
            <InviteCard key={invi.pjt} invite={invi} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Invite;
