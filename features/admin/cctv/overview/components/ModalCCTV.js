import React from 'react'
import { Button, Modal } from 'antd'
import ReactPlayer from 'react-player';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { HistoryOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute z-10 flex items-center gap-3 m-3">
      <Button type="primary" className='bg-green-500' icon={<PlusOutlined />} onClick={() => zoomIn()}>ขยายเข้า</Button>
      <Button type="primary" className='bg-red-500' icon={<MinusOutlined />} onClick={() => zoomOut()}>ขยายออก</Button>
      <Button type="primary" className='bg-blue-500' icon={<HistoryOutlined />} onClick={() => resetTransform()}>คืนค่าเริ่มต้น</Button>
    </div>
  );
};

const ModalContent = (props) => {
  const { data } = props;

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controls />
          <TransformComponent
            contentClass='!w-full'
            wrapperClass='!w-full'
          >
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
          </TransformComponent>
        </>
      )}

    </TransformWrapper>
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
