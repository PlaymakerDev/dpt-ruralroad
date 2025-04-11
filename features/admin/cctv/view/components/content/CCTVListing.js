import React, { useMemo, useContext, useEffect } from 'react'
import { Card, Col, Empty, Image, Row, Typography } from 'antd'
// import ReactPlayer from 'react-player/lazy'
import dynamic from "next/dynamic";
import { CCTVInactive } from '@/components/icon';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
import { PageContext } from '@/pages/admin/cctv/view/[id]';

const CCTVListing = (props) => {
  const { data, station } = props
  const { setMenuName } = useContext(PageContext)

  useEffect(() => {
    setMenuName(station.station_description)
  }, [station, setMenuName])

  // const imgList = useMemo(() => {
  //   return [
  //     {
  //       title: 'DRR-SSTS-CAM01 (N)',
  //       img_src: 'https://as2.ftcdn.net/v2/jpg/02/08/75/13/1000_F_208751337_4UXixNOpp3dKIAZrWP8yT2ALtAWjx8Rs.jpg',
  //       // video_src: 'https://www.youtube.com/watch?v=zR3z8GtJB5A&pp=ygUMc2FueiBiaXRlIGpw',
  //       // video_src: 'https://www.youtube.com/watch?v=6dp-bvQ7RWo',
  //       video_src: 'https://67mst-pyoipc025-015.enixma.net/live/10.172.24.6.stream/playlist.m3u8',
  //       alt: 'route_img_1'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM02 (N)',
  //       img_src: 'https://www.bit-cctv.com/uploads/image/20210315/Transportation-And-Traffic2.png',
  //       // video_src: 'https://www.youtube.com/watch?v=cK1ABiGuiG0&pp=ygUMc2FueiBiaXRlIGpw',
  //       video_src: 'https://www.youtube.com/watch?v=gFRtAAmiFbE',
  //       alt: 'route_img_2'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM01 (N)',
  //       img_src: 'https://www.tavcom.com/wp-content/uploads/2021/11/shutterstock_443707396-scaled.jpg',
  //       // video_src: 'https://www.youtube.com/watch?v=Nizm-_h1VG4',
  //       video_src: 'https://www.youtube.com/watch?v=DjdUEyjx8GM',
  //       alt: 'route_img_3'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM02 (N)',
  //       img_src: 'https://previews.123rf.com/images/wattanaphob/wattanaphob1607/wattanaphob160700145/60141169-closeup-of-traffic-security-camera-surveillance-cctv-on-the-road-in-the-big-city.jpg',
  //       // video_src: 'https://www.youtube.com/watch?v=oxJeQc-C-_4',
  //       video_src: 'https://www.youtube.com/watch?v=cH7VBI4QQzA',
  //       alt: 'route_img_4'
  //     },
  //     {
  //       title: 'DRR-SSTS-CAM01 (N)',
  //       img_src: 'https://st2.depositphotos.com/3000273/5444/i/950/depositphotos_54443565-stock-photo-cctv-camera-or-surveillance-operating.jpg',
  //       // video_src: 'https://www.youtube.com/watch?v=7m8OSE7n-jY&pp=ygUfaG9wZSBpcyB0aGUgdGhpbmcgd2l0aCBmZWF0aGVycw%3D%3D',
  //       video_src: 'https://www.youtube.com/watch?v=lA6TaaMGgDo',
  //       alt: 'route_img_5'
  //     },
  //   ]
  // }, [])

  const renderImageCard = useMemo(() => {
    const routeImage = data?.map((item, index) => {
      if (item.camera_status === 'Offline') {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} key={index}>
            <div className="border rounded-lg p-3 h-full">
              <figure className='h-72 relative overflow-hidden rounded-lg bg-[#101524]'>
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
            </div>
          </Col>
        )
      } else {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} key={index}>
            <div className="border rounded-lg p-3 h-full">
              <figure className='h-72 relative overflow-hidden rounded-lg bg-[#101524]'>
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
                {/* <Image
                  src={item.img_src}
                  alt={item.alt}
                  width={'100%'}
                  height={'100%'}
                  className='relative object-cover object-center'
                  fallback='data:image/png;base64,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'
                /> */}
                <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                  <div className='block p-3'>
                    <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                  </div>
                </section>
              </figure>
            </div>
          </Col>
        )
      }
    })
    return routeImage
  }, [data])

  const checkAppropriateData = useMemo(() => {
    if (!!Number(station.total_cameras)) {
      return renderImageCard
    }
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
        <Empty
          description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
        />
      </Col>
    )
  }, [renderImageCard, station.total_cameras])

  return (
    <div>
      <Typography.Title level={3}>รายการกล้อง CCTV {station.station_description || '-'}</Typography.Title>
      <Row gutter={[16, 16]}>
        {checkAppropriateData}
      </Row>
    </div>
  )
}

export default React.memo(CCTVListing)
