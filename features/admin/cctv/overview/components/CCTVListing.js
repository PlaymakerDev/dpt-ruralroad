import React, { useMemo, useState } from 'react'
import { Card, Col, Row, Typography, Empty, Modal } from 'antd'
// SWIPER
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// SWIPER CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CCTVInactive } from '@/components/icon';
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const INIT_MODAL = { open: false, data: null }
const INIT_DETAIL = { open: false, data: { cctv: null, station: null } }

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

const DetailContent = (props) => {
  const { cctv, station } = props;

  const renderImageCard = useMemo(() => {
    const routeImage = cctv?.map((item, index) => {
      if (item.camera_status === 'Offline') {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
            {/* <div className="border rounded-lg p-3 h-full"> */}
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
            {/* </div> */}
          </Col>
        )
      } else {
        return (
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
            {/* <div className="border rounded-lg p-3 h-full"> */}
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
                    fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='
                  /> */}
                <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0'>
                  <div className='block p-3'>
                    <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                  </div>
                </section>
              </figure>
            {/* </div> */}
          </Col>
        )
      }
    })
    return routeImage
  }, [cctv])

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
    <Row gutter={[16, 16]}>
      {checkAppropriateData}
    </Row>
  )
}

const CCTVListing = (props) => {
  const { cctv, station } = props
  const [open, setOpen] = useState(INIT_MODAL)
  const [detail, setDetail] = useState(INIT_DETAIL)

  const renderImageCard = useMemo(() => {
    const routeImage = cctv?.map((item, index) => {
      if (item.camera_status === 'Offline') {
        return (
          <SwiperSlide>
            {/* <div className="border rounded-lg p-3 h-full"> */}
            <figure className='h-72 relative overflow-hidden rounded-lg bg-[#101524]'>
              <CCTVInactive
                width={82}
                height={80}
                className='!block !h-full !m-auto'
              />
              <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0 pb-6'>
                <div className='block p-3'>
                  <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                </div>
              </section>
            </figure>
            {/* </div> */}
          </SwiperSlide>
        )
      } else {
        return (
          <SwiperSlide>
            {/* <div className="border rounded-lg p-3 h-full"> */}
            <figure
              className='h-72 relative overflow-hidden rounded-lg bg-[#101524]'
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
              {/* <Image
                    src={item.img_src}
                    alt={item.alt}
                    width={'100%'}
                    height={'100%'}
                    className='relative object-cover object-center'
                    fallback='data:image/png;base64,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'
                    /> */}
              <section className='bg-gradient-to-r from-black absolute bottom-0 left-0 right-0 pb-6'>
                <div className='block p-3'>
                  <Typography.Text className='!text-md' strong>{item.camera_description}</Typography.Text>
                </div>
              </section>
            </figure>
            {/* </div> */}
          </SwiperSlide>
        )
      }
    })
    return routeImage
  }, [cctv])

  const checkAppropriateData = useMemo(() => {
    if (!!Number(station.total_cameras)) {
      return renderImageCard
    }
    return (
      <figure className='h-72 flex justify-center items-center'>
        <Empty
          description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
        />
      </figure>
    )
  }, [renderImageCard, station.total_cameras])

  return (
    <>
      <Card
        classNames={{
          body: '!p-0'
        }}
      >
        <Row gutter={[0, 16]}>
          <Col xs={24} sm={24} md={12} lg={24} xl={12} xxl={12}>
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              navigation
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: (_, className) => {
                  return '<span class="' + className + '" /></span>';
                },
              }}
              autoplay={{
                delay: 3000,
                pauseOnMouseEnter: true
              }}
            >
              {checkAppropriateData}
            </Swiper>
            <div className='swiper-pagination' />
          </Col>
          <Col xs={24} sm={24} md={12} lg={24} xl={12} xxl={12}>
            <section className='p-5 h-full flex flex-col justify-between'>
              <div className=''>
                <Typography.Title level={4}>{station.station_description || '-'}</Typography.Title>
                <div className='flex justify-between flex-wrap items-center'>
                  <Typography.Text className='!text-lg'>จำนวนกล้องทั้งหมด</Typography.Text>
                  <Typography.Text className='!text-lg !font-bold'>{station.total_cameras || 0}</Typography.Text>
                </div>
                <div className='flex justify-between flex-wrap items-center'>
                  <Typography.Text className='!text-lg'>ใช้งานได้</Typography.Text>
                  <Typography.Text className='!text-lg !text-green-500 !font-bold'>{station.online_cameras || 0}</Typography.Text>
                </div>
                <div className='flex justify-between flex-wrap items-center'>
                  <Typography.Text className='!text-lg'>ใช้งานไม่ได้</Typography.Text>
                  <Typography.Text className='!text-lg !text-red-500 !font-bold'>{station.offline_cameras || 0}</Typography.Text>
                </div>
              </div>
              <div className='text-end'>
                <Typography.Text
                  className='!text-lg !font-bold !cursor-pointer'
                  underline
                  onClick={() => setDetail({ open: true, data: { cctv: cctv, station: station } })}
                >
                  รายละเอียด
                </Typography.Text>
              </div>
            </section>
          </Col>
        </Row>
      </Card>
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
      <Modal
        title={detail.data.station?.station_description}
        open={detail.open}
        onCancel={() => setDetail(INIT_DETAIL)}
        footer={false}
        width={'100dvh'}
        destroyOnClose
      >
        {detail.open ?
          <DetailContent
            cctv={detail.data.cctv}
            station={detail.data.station}
          />
          : null}
      </Modal>
    </>
  )
}

export default React.memo(CCTVListing)
