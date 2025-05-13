import React, { useMemo, useState } from 'react'
import { Card, Col, Row, Typography, Progress } from 'antd'

const ContentRoute = (props) => {
  const { data, setOpen, openModal } = props

  const renderProgressCard = useMemo(() => {
    const newData = data?.map((item, index) => {
      return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} key={index} className='!h-full'>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg px-4 py-1 cursor-pointer'
            onClick={() => openModal(item)}
          >
            <section className='flex flex-wrap justify-between'>
              <p className='text-[clamp(1px, 4vw, 15px)] font-bold underline'>{item.road_code}</p>
              <p className='text-[clamp(1px, 4vw, 15px)]'>{item.percentage}% &gt;</p>
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
                trailColor={'#294C4F'}
              />
            </section>
          </figure>
        </Col>
      )
    })
    return newData
  }, [data, openModal])

  return (
    <Row gutter={[8, 8]}>
      {renderProgressCard}
    </Row>
  )
}

export default React.memo(ContentRoute)
