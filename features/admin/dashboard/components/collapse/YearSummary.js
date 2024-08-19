import React, { useState } from 'react'
import { Card, Row, Col, Typography, Flex } from 'antd'
import Image from 'next/image'
import ArrowUp from '@/public/images/arrow-up.svg'
import { DrawerYearSummary } from '../drawer'

const YearSummary = (props) => {
  const { } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className='!cursor-pointer' onClick={() => setOpen(true)}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Flex
              align='center'
              gap={10}
            >
              <Image
                src={ArrowUp}
                alt='arrow-up'
              />
              <Typography.Text className='!text-xl !font-IBMPlexSansThaiRegular' strong>ประวัติสรุปผลรายปี</Typography.Text>
            </Flex>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='lg:!text-end'>
            <Typography.Text className='!text-xl !font-IBMPlexSansThaiRegular' strong>ปีงบประมาณ 2557 - ปัจจุบัน</Typography.Text>
          </Col>
        </Row>
      </Card>
      <DrawerYearSummary
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default React.memo(YearSummary)
