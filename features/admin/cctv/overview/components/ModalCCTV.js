import React from 'react'
import { Modal } from 'antd'
import ReactPlayer from 'react-player';

const ModalContent = (props) => {
  const { data } = props;

  return (
    <ReactPlayer
      url={data.stream_url}
      width='100%'
      height='100%'
      style={{
        position: 'relative'
      }}
      playing
      muted
    />
  )
}

const ModalCCTV = (props) => {
  const { open, info, onClose } = props

  return (
    <Modal
      title={info?.camera_description || '-'}
      open={open}
      onCancel={() => onClose()}
      footer={false}
      width={'100dvh'}
      destroyOnClose
    >
      <ModalContent
        data={info}
      />
    </Modal>
  )
}

export default React.memo(ModalCCTV)
