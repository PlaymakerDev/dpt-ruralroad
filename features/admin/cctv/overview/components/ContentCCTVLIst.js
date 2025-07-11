import React, { useMemo } from 'react'
import { Badge, Col, Empty, Modal, Row, Tag, Typography } from 'antd'
import { CCTVInactive } from '@/components/icon';
import ReactPlayer from 'react-player';
import { EditOutlined } from '@ant-design/icons';
import { CAMERA_TYPE } from '@/utils/constant';

const DetailContent = (props) => {
  const { cctv, station, cctvRef, setOpen, onOpenConfig, cctvStatus } = props;

  console.log("inside ===",cctvStatus)

  const renderImageCard = useMemo(() => {
    let arrList = cctv
    // SET DEFAULT DATA
    if (cctvRef.current) {
      arrList = cctv
    } else {
      if (cctvStatus === 'ALL' || cctvStatus === null) {
        arrList = [...cctv]?.sort(() => Math.random() - 0.5).slice(0, 6)
      } else {
        arrList = cctv
      }
    }

    // CHECK IF ARRLIST HAVE A LENGTH
    if (!arrList.length) {
      return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <figure className='h-80 flex justify-center items-center'>
            <Empty
              description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
            />
          </figure>
        </Col>
      )
    }
    // RENDER
    const routeImage = arrList?.map((item, index) => {
      if (item.camera_status === 'Offline') {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={index}>
            <figure className='h-80 relative overflow-hidden rounded-lg bg-[#101524]'>
              <CCTVInactive
                width={82}
                height={80}
                className='!block !h-full !m-auto'
              />
              <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                <div className='flex justify-between items-center'>
                  <div className='block p-3'>
                    <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                    {cctvRef.current ? <EditOutlined className='!text-white !cursor-pointer' onClick={() => onOpenConfig({ open: true, data: item })} /> : null}
                  </div>
                  <div className='block p-3'>
                    <Tag color={item.camera_status === "Online" ? '#22c55e' : '#FF4A4A'}>{CAMERA_TYPE[item.camera_type]}</Tag>
                  </div>
                </div>
              </section>
            </figure>
          </Col>
        )
      } else {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={index}>
            <figure className='h-80 relative overflow-hidden rounded-lg bg-[#101524]'>
              <div onClick={() => setOpen({ open: true, data: item })}              >
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
              </div>
              <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                <div className='flex justify-between items-center'>
                  <div className='block p-3'>
                    <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                    {cctvRef.current ? <EditOutlined className='!text-white !cursor-pointer' onClick={() => onOpenConfig({ open: true, data: item })} /> : null}
                  </div>
                  <div className='block p-3'>
                    <Tag color={item.camera_status === "Online" ? '#22c55e' : '#FF4A4A'}>{CAMERA_TYPE[item.camera_type]}</Tag>
                  </div>
                </div>
              </section>
            </figure>
          </Col>
        )
      }
    })
    return routeImage
  }, [cctv, cctvRef, onOpenConfig, setOpen, cctvStatus])

  // const checkAppropriateData = useMemo(() => {
  //   if (!!Number(station.total_cameras)) {
  //     return renderImageCard
  //   }
  //   return (
  //     <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
  //       <figure className='h-72 flex justify-center items-center'>
  //         <Empty
  //           description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
  //         />
  //       </figure>
  //     </Col>
  //   )
  // }, [renderImageCard, station.total_cameras])

  return (
    <Row gutter={[16, 16]}>
      {renderImageCard}
    </Row>
  )
}

const ContentCCTVList = (props) => {
  const { cctv, station, cctvRef, setOpen, setConfig, cctvStatus } = props

  return (
    <DetailContent
      cctv={cctv}
      station={station}
      cctvRef={cctvRef}
      setOpen={setOpen}
      onOpenConfig={setConfig}
      cctvStatus={cctvStatus}
    />
  )
}

export default React.memo(ContentCCTVList)
