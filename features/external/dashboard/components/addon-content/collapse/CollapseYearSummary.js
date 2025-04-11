import React, { useCallback, useEffect, useState } from 'react'
import { Card, Row, Col, Typography, Flex, message } from 'antd'
import Image from 'next/image'
import ArrowUp from '@/public/images/arrow-up.svg'
import { DrawerYearSummary } from '../drawer'
import { getSumWeightYear } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const INIT_DRAWER = { open: false, info: {}, loading: false }

const CollapseYearSummary = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_DRAWER)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getSumWeightYear, reducerName: 'dashboard', reducerKey: 'sum_weight_year'
  })

  const openDrawer = useCallback(async () => {
    const data = await apiGetData(`/api/v1/dashboards/sum_weight_year`, {}, false, {})
    if (data?.success) {
      setOpen({
        open: true,
        info: data?.data,
        loading: loading
      })
    } else {
      message.error('Something went wrong!')
    }
  }, [apiGetData, loading])

  return (
    <>
      <Card className='!cursor-pointer' body={{ padding: '0.5rem', margin: 0 }} onClick={() => openDrawer()}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Flex
              align='center'
              gap={10}
            >
              <Image
                src={ArrowUp}
                alt='arrow-up'
              />
              <Typography.Text className=' !font-IBMPlexSansThaiRegular' style={{ fontSize: 'clamp(1px, 3vw, 15px)' }} strong>ประวัติสรุปผลรายปี</Typography.Text>
            </Flex>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='!text-end'>
            <Typography.Text className=' !font-IBMPlexSansThaiRegular' style={{ fontSize: 'clamp(1px, 3vw, 15px)' }} strong>ปีงบประมาณ 2557 - ปัจจุบัน</Typography.Text>
          </Col>
        </Row>
      </Card>
      <DrawerYearSummary
        open={open.open}
        info={open.info}
        loading={open.loading}
        setOpen={setOpen}
      />
    </>
  )
}

export default React.memo(CollapseYearSummary)
