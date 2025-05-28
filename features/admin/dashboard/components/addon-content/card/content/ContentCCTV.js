import React, { useMemo, useState } from 'react'
import { Card, Col, Empty, Image, Modal, Row, Typography } from 'antd'
// import ReactPlayer from 'react-player/lazy'
import dynamic from "next/dynamic";
// import { div } from '@/utils/calculate';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const INIT_MODAL = { open: false, data: null }

const ModalContent = (props) => {
  const { data } = props;

  return (
    <ReactPlayer
      url={data.rtsp_hls}
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

const ContentCCTV = (props) => {
  const { data } = props
  const [open, setOpen] = useState(INIT_MODAL)
  // const imgList = useMemo(() => {
  //   return [
  //     {
  //       title: 'DRR-SSTS-CAM01 (N)',
  //       video_src: 'https://www.youtube.com/watch?v=zR3z8GtJB5A&pp=ygUMc2FueiBiaXRlIGpw',
  //       alt: 'route_img_1'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM02 (N)',
  //       video_src: 'https://www.youtube.com/watch?v=cK1ABiGuiG0&pp=ygUMc2FueiBiaXRlIGpw',
  //       alt: 'route_img_2'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM01 (N)',
  //       video_src: 'https://www.youtube.com/watch?v=Nizm-_h1VG4',
  //       alt: 'route_img_3'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM02 (N)',
  //       video_src: 'https://www.youtube.com/watch?v=oxJeQc-C-_4',
  //       alt: 'route_img_4'
  //     },
  //   ]
  // }, [])

  // const renderImageCard = useMemo(() => {
  //   // กำหนดจำนวน loop เป็น 4 ครั้ง

  //   const routeImage = Array.from({ length: 4 }).map((_, index) => {
  //     // ตรวจสอบว่ามีข้อมูลหรือไม่
  //     const item = data?.[index] || {}; // ถ้าไม่มีข้อมูลให้ใช้ค่าเริ่มต้นเป็น object เปล่า

  //     return (
  //       <Col
  //         xs={24}
  //         sm={24}
  //         md={12}
  //         lg={12}
  //         xl={12}
  //         xxl={12}
  //         key={index}
  //         className={`${index === 1 || index === 3 ? 'pl-4' : ''} ${index === 2 || index === 3 ? 'pt-4' : ''}`}
  //       >
  //         <Card styles={{ body: { padding: 0, margin: 0 } }} className='!h-full'>
  //           <div className=" relative rounded-lg h-full flex items-end justify-center overflow-hidden">
  //             <div className='h-[10.5rem] overflow-hidden rounded-sm bg-[#101524]'>
  //               <div className="flex justify-center items-center w-full h-full">
  //                 {item.rtsp_hls ? (
  //                   <ReactPlayer
  //                     url={item.rtsp_hls}
  //                     playing={true}
  //                     muted
  //                     width={'160%'}
  //                     height={'160%'}
  //                   />
  //                 ) : (
  //                   ''
  //                 )}
  //               </div>
  //             </div>
  //             <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
  //               <div className='block p-3'>
  //                 <Typography.Text className='!text-md' strong>{item.rtsp_hls ? item.camera_desc || 'No Description' : 'No Video'}</Typography.Text>
  //               </div>
  //             </section>
  //           </div>
  //         </Card>
  //       </Col>
  //     );
  //   });

  //   return routeImage;
  // }, [data]);

  const renderImageCard = useMemo(() => {
    const routeImage = data?.map((item, index) => {
      return (
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
          <figure
            className='h-44 relative overflow-hidden rounded-lg bg-[#101524]'
            onClick={() => setOpen({ open: true, data: item })}
          >
            <ReactPlayer
              url={item.rtsp_hls}
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
                <Typography.Text className='!text-md' strong>{item.rtsp_hls ? item.camera_desc || 'No Description' : 'No Video'}</Typography.Text>
              </div>
            </section>
          </figure>
        </Col>
      )
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
        title={open.data?.camera_desc || '-'}
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
    // <div className=' !w-full !h-full  flex items-end justify-center '>
    //   <Row gutter={[0, 0]} className='!w-full '>
    //     {renderImageCard}
    //   </Row>
    // </div>
  )
}

export default React.memo(ContentCCTV)
