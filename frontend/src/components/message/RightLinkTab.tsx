import React, { useEffect, useState } from "react";
import styles from "./RightLinkTab.module.css";
import LinkOGItem from "./LinkOGItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ModalComponent from "./CreateLinkModal";
import { Button } from "antd";
import { useRecoilState } from "recoil";
import { linkState } from "../../stores/linkState";
import { getLinks, deleteLink, updateLink } from "../../utils/linkApi";
import { Popover } from "antd";

interface Props {
  projectId: string;
}

export default function RightLinkTab({ projectId }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [links, setLinks] = useRecoilState(linkState);
  const [isModalUpdate, setIsModalUpdate] = useState("");

  const showModal = () => {
    setIsModalUpdate("");
    setIsModalVisible(true);
  };
  const showModalUpdate = (link: any) => {
    console.log(link);
    setIsModalUpdate(link);
    setIsModalVisible(true);
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

  // 링크 등록
  const deleteInLinks = async (linkId: string) => {
    try {
      const response = await deleteLink(linkId);
      console.log(response.data);
      getInLinks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInLinks();
  }, []);

  const Action = ({ link }: { link: any }) => (
    <div>
      <Button
        style={{ backgroundColor: "#39A789", fontFamily: "preRg" }}
        key="submit"
        type="primary"
        onClick={() => showModalUpdate(link)}
      >
        수정
      </Button>
      <Button
        style={{ backgroundColor: "red", fontFamily: "preRg" }}
        key="submit"
        type="primary"
        onClick={() => deleteInLinks(link.linkId)}
      >
        삭제
      </Button>
    </div>
  );

  return (
    <div className={styles.MessageRightBody}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className={styles.addLink}>링크 추가하기</p>
        <BsFillPlusCircleFill
          onClick={showModal}
          style={{ marginLeft: "5px", fontSize: "20px", color: "grey" }}
        />
      </div>
      <div className={styles.BookMarkContainer}>
        {links.length !== 0 ? (
          links.map((link: any) => (
            <Popover
              placement="rightBottom"
              content={<Action link={link} />}
              trigger="contextMenu"
            >
              <div key={link.linkId}>
                <LinkOGItem requestUrl={link.content || link} />
              </div>
            </Popover>
          ))
        ) : (
          <p className={styles.noPhoto}>등록된 링크가 없습니다.</p>
        )}
      </div>

      <ModalComponent
        pjtId={projectId}
        open={isModalVisible}
        setOpen={setIsModalVisible}
        isModalUpdate={isModalUpdate}
      />
    </div>
  );
}
