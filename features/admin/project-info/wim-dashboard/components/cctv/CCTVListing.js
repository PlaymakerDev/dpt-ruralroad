import React, { useMemo, useContext, useEffect, useState } from 'react'
import { Card, Col, Empty, Image, Modal, Row, Typography } from 'antd'
// import ReactPlayer from 'react-player/lazy'
import { CCTVInactive } from '@/components/icon';
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const INIT_MODAL = { open: false, data: null }

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

const CCTVList = (props) => {
  const { data } = props
  const [open, setOpen] = useState(INIT_MODAL)

  const renderImageCard = useMemo(() => {
    const routeImage = data?.map((item, index) => {
      if (item.camera_status === 'Offline') {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
            <figure className='h-44 relative overflow-hidden rounded-lg bg-[#101524]'>
              <CCTVInactive
                width={82}
                height={80}
                className='!block !h-full !m-auto'
              />
              <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                <div className='block p-3'>
                  <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                </div>
              </section>
            </figure>
          </Col>
        )
      } else {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
            <figure
              className='h-44 relative overflow-hidden rounded-lg bg-[#101524]'
              onClick={() => setOpen({ open: true, data: item })}
            >
              <ReactPlayer
                url={item.stream_url}
                width='100%'
                height='100%'
                style={{
                  position: 'relative'
                }}
                playing
                muted

              />
              <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                <div className='block p-3'>
                  <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                </div>
              </section>
            </figure>
          </Col>
        )
      }
    })
    return routeImage
  }, [data])

  const checkAppropriateData = useMemo(() => {
    if (!!data?.length) {
      return renderImageCard
    }
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className='!h-full'>
        <Empty
          description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
          className='!flex !flex-col !items-center !justify-center !h-full'
        />
      </Col>
    )
  }, [renderImageCard, data?.length])

  return (
    <>
      <Row gutter={[16, 16]} className='!h-full'>
        {checkAppropriateData}
      </Row>
      {/* MODAL SECTION */}
      <Modal
        title={open.data?.camera_description || '-'}
        open={open.open}
        onCancel={() => setOpen(INIT_MODAL)}
        footer={false}
        width={'100dvh'}
        destroyOnClose
      >
        {open.open ?
          <ModalContent
            data={open.data}
          />
          : null}
      </Modal>
    </>
  )
}

export default React.memo(CCTVList)
