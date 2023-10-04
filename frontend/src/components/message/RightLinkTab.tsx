import React, { useEffect, useState } from "react";
import styles from "./RightLinkTab.module.css";
import LinkOGItem from "./LinkOGItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ModalComponent from "./CreateLinkModal";
import { Button } from "antd";
import { useRecoilState } from "recoil";
import { linkState } from "../../stores/linkState";
import { getLinks } from "../../utils/linkApi";

interface Props {
  projectId: string;
}

export default function RightLinkTab({ projectId }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [links, setLinks] = useRecoilState(linkState);

  const showModal = () => {
    setIsModalVisible(true);
  };

  let mouseDownX = 0;
  let mouseUpX = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownX = e.clientX;
  };

  const handleMouseUp = (linkId: string) => {
    if (
      mouseUpX < mouseDownX &&
      Math.abs(mouseDownX - mouseUpX) > window.innerWidth / 4
    ) {
      // 오른쪽으로 드래그
      console.log("우");
      // deleteLink(linkId);
    } else if (
      mouseUpX > mouseDownX &&
      Math.abs(mouseDownX - mouseUpX) > window.innerWidth / 4
    ) {
      // 왼쪽으로 드래그
      console.log("좌");
      // 여기에 원하는 동작을 추가하세요.
    }
    // 초기화
    mouseDownX = 0;
    mouseUpX = 0;
  };

  // 링크 등록
  const getInLinks = async () => {
    try {
      const response = await getLinks(projectId);
      console.log(response.data.result[0]);
      setLinks(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInLinks();
  }, []);

  // const addNewLink = (newLink: string) => {
  //   setLinks([...links, newLink]);
  //   setIsModalVisible(false);
  // }

  return (
    <div className={styles.MessageRightBody}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <span className={styles.MessageRightBodyTitle}>
          링크
        </span> */}
        <p className={styles.addLink}>링크 추가하기</p>
        <BsFillPlusCircleFill
          onClick={showModal}
          style={{ marginLeft: "5px", fontSize: "20px", color: "grey" }}
        />
      </div>
      <div className={styles.BookMarkContainer}>
        {links.length !== 0 ? (
          links.map((link: any) => (
            <div
              key={link.linkId}
              onMouseDown={handleMouseDown}
              onMouseMove={(e: React.MouseEvent) => {
                mouseUpX = e.clientX;
              }}
              onMouseUp={() => handleMouseUp(link.linkId)}
            >
              <LinkOGItem requestUrl={link.content} />
            </div>
          ))
        ) : (
          <p className={styles.noPhoto}>등록된 링크가 없습니다.</p>
        )}
      </div>

      <ModalComponent
        pjtId={projectId}
        open={isModalVisible}
        setOpen={setIsModalVisible}
      />
    </div>
  );
}
