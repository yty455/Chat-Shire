import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd';

const { TextArea } = Input;

const ModalComponent: React.FC<{open: boolean; setOpen: (open: boolean) => void}> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  
  return (
      <Modal
        title="링크 등록하기"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{fontFamily:'preRg'}}
        bodyStyle={{height: '200px'}}
        footer={[
          <Button style={{fontFamily:'preRg'}} key="back" onClick={handleCancel}>
            닫기
          </Button>,
          <Button style={{backgroundColor:'#39A789', fontFamily:'preRg'}} key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            등록하기
          </Button>,
        ]}
      >
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
          <p style={{fontSize: '15px'}}>북마크로 등록할 링크를 입력해주세요.</p>
          <TextArea allowClear rows={4} />
        </div>
      </Modal>
    
  );
};

export default ModalComponent;