import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import InviteCard from "./InviteCard";
import styles from "./invite.module.css";
import {
  getInvitation,
  acceptInvitation,
  rejectInvitation,
} from "../../utils/invitationApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRecoilState } from "recoil";
import { nowProject_recoil } from "../../stores/atom";
import { getProjects } from "../../utils/projectApi";

function Invite() {
  const [invitation, setInvitation] = useState([]);
  const [nowProject, setNowProject] = useRecoilState(nowProject_recoil);
  const today = new Date();

  const getMyProjects = async () => {
    try {
      const response = await getProjects();
      setNowProject(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // 초대 불러오기
  const getInInvitation = async () => {
    try {
      const response = await getInvitation();
      setInvitation(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // 초대 수락
  const acceptInInvitation = async (invitationId: string) => {
    try {
      const response = await acceptInvitation(invitationId);
      getInInvitation();
      getMyProjects();
    } catch (error) {
      console.error(error);
    }
  };

  // 초대 거절
  const rejectInInvitation = async (invitationId: string) => {
    try {
      const response = await rejectInvitation(invitationId);
      getInInvitation();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInInvitation();
  }, []);

  const url =
    "http://github.com/samholmes/node-open-graph/raw/master/test.html";

  return (
    <div className={styles.InviteContainer}>
      <span className={styles.InviteTitle}>초대함</span>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        direction={"vertical"}
        grabCursor={true}
        className={styles.InvitationItemContainer}
      >
        {invitation.map((invi: any) => (
          <SwiperSlide className={styles.SwiperItem}>
            <InviteCard
              key={invi.id}
              invite={invi}
              acceptInvitation={acceptInInvitation}
              rejectInvitation={rejectInInvitation}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Invite;
