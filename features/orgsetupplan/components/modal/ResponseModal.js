import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Modal, Row } from 'antd';
import ErrorIco from '@/public/ErrorIco';
import SuccessIco from '@/public/SuccessIco';

const ResponseModal = ({ firstline, secondline, icon, visible, onClose }) => {
  const getIcon = () => {
    switch (icon) {
      case 'success':
        return <SuccessIco />;
      case 'error':
        return <ErrorIco />;
      default:
        return null;
    }
  };

  return (
    <Modal
      title=""
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      closable={false}
      footer={
        <Row justify="center">
          <Button key="submit" type="primary" onClick={onClose}>
            ตกลง
          </Button>
        </Row>
      }
    >
      <Row justify="center" align="middle" style={{ textAlign: 'center' }}>
        {getIcon()}
      </Row>
      <Row justify="center" align="middle">
        <Typography.Text>{firstline}</Typography.Text>
      </Row>
      <Row justify="center" align="middle">
        <Typography.Text>{secondline}</Typography.Text>
      </Row>
    </Modal>
  );
};



export default ResponseModal;
