import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { useSetRecoilState } from 'recoil';
import { linkState } from '../../stores/linkState';

const { TextArea } = Input;

const ModalComponent: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [link, setLink] = useState("");
  const setLinks = useSetRecoilState(linkState);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setLinks((oldLinks) => [...oldLinks, link]);
      setLink("");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="링크 등록하기"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      style={{ zIndex: 2000, fontFamily: "preRg" }}
      bodyStyle={{ height: "200px" }}
      footer={[
        <Button
          style={{ backgroundColor: "#39A789", fontFamily: "preRg" }}
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
        >
          완료
        </Button>,
        <Button
          style={{ fontFamily: "preRg" }}
          key="back"
          onClick={handleCancel}
        >
          취소
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p style={{ fontSize: "15px" }}>북마크로 등록할 링크를 입력해주세요.</p>
        <TextArea
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ height: 100, resize: "none" }}
          allowClear
          rows={4}
        />
      </div>
    </Modal>
  );
};

export default ModalComponent;
