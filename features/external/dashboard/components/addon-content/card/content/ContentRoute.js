import React, { useMemo, useState } from 'react'
import { Card, Col, Row, Typography, Progress } from 'antd'

const ContentRoute = (props) => {
  const { data, setOpen, openModal } = props

  const renderProgressCard = useMemo(() => {

    const fiveData = data?.map((item, index) => {
      if (index === 0) {
        return (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} key={index} className='!h-full'>
            <figure
              className='border-solid border-2 border-lightblue rounded-lg px-4 py-2 cursor-pointer'
              onClick={() => openModal(item)}
            >
              <section className='flex flex-wrap justify-between !-mb-2'>
                <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }} strong underline>{item.road_code}</Typography.Text>
                <div>
                  <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}>{item.percentage}%</Typography.Text>
                  <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}> &gt;</Typography.Text>
                </div>
              </section>
              <section>
                <Progress
                  percent={item.percentage}
                  size={{
                    height: '0.4rem'
                  }}
                  strokeColor={'#56E4EE'}
                  percentPosition={{
                    align: 'end',
                    type: 'outer',
                  }}
                  showInfo={false}
                  className='!-my-8 '
                  trailColor={'#294C4F'}
                // style={{ backgroundColor: '#294C4F', borderRadius: '0.25rem' }}
                />
              </section>
            </figure>
          </Col>
        )
      } else {
        return (
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} key={index} className='!h-full'>
            <figure
              className='border-solid border-2 border-lightblue rounded-lg px-4  cursor-pointer'
              onClick={() => openModal(item)}
            >
              <section className='flex flex-wrap justify-between !-mb-2'>
                <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }} strong underline>{item.road_code}</Typography.Text>
                <div>
                  <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}>{item.percentage}%</Typography.Text>
                  <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}> &gt;</Typography.Text>
                </div>
              </section>
              <section>
                <Progress
                  percent={item.percentage}
                  size={{
                    height: '0.4rem'
                  }}
                  strokeColor={'#56E4EE'}
                  percentPosition={{
                    align: 'end',
                    type: 'outer',
                  }}
                  showInfo={false}
                  className='!-my-8 '
                  trailColor={'#294C4F'}
                />
              </section>
            </figure>
          </Col>
        )
      }
    })

    const fourData = data.map((item, index) => {
      return (
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} key={index} className='!h-full'>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg px-4  cursor-pointer'
            onClick={() => openModal(item)}
          >
            <section className='flex flex-wrap justify-between !-mb-2 py-1'>
              <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }} strong underline>{item.road_code}</Typography.Text>
              <div>
                <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}>{item.percentage}%</Typography.Text>
                <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}> &gt;</Typography.Text>
              </div>
            </section>
            <section className='pb-1'>
              <Progress
                percent={item.percentage}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                showInfo={false}
                className='!-my-8 '
                trailColor={'#294C4F'}
              />
            </section>
          </figure>
        </Col>
      )
    })

    const lessFourData = data.map((item, index) => {
      return (
        <Col span={24} key={index} className='!h-full'>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg px-4  cursor-pointer'
            onClick={() => openModal(item)}
          >
            <section className='flex flex-wrap justify-between !-mb-2'>
              <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }} strong underline>{item.road_code}</Typography.Text>
              <div>
                <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}>{item.percentage}%</Typography.Text>
                <Typography.Text className='' style={{ fontSize: 'clamp(1px, 4vw, 14px)' }}> &gt;</Typography.Text>
              </div>
            </section>
            <section>
              <Progress
                percent={item.percentage}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                showInfo={false}
                className='!-my-8 '
                trailColor={'#294C4F'}
              />
            </section>
          </figure>
        </Col>
      )
    })

    if (data?.length == 5) {
      return fiveData
    }
    if (data?.length == 4) {
      return fourData
    }

    return lessFourData
    // return newData
  }, [data, openModal])

  return (
    <Row gutter={[8, 8]} className='!h-full'>
      {renderProgressCard}

    </Row>
  )
}

export default React.memo(ContentRoute)
