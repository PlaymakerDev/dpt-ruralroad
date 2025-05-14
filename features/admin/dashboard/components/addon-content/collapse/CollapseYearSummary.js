import React, { useCallback, useEffect, useState } from 'react'
import { Card, Row, Col, Typography, Flex, message } from 'antd'
import Image from 'next/image'
import ArrowUp from '@/public/images/arrow-up.svg'
import { DrawerYearSummary } from '../drawer'
import { getSumWeightYearV2 } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import dayjs from 'dayjs'

const INIT_DRAWER = { open: false, info: { data: [], summary: [] }, loading: false }

const CollapseYearSummary = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_DRAWER)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getSumWeightYearV2, reducerName: 'dashboard', reducerKey: 'sum_weight_year_v2'
  })

  const openDrawer = useCallback(async () => {
    const data = await apiGetData(`/api/v1/dashboards/sum_weight_year_v2`, false, {})
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
      <div className="card-container rounded-md p-2 cursor-pointer" onClick={() => openDrawer()}>
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
              <p className='text-[clamp(1px, 4vw, 15px)] font-bold'>ประวัติสรุปผลรายปี</p>
            </Flex>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='!text-end'>
            <p className='text-[clamp(1px, 4vw, 15px)] font-bold'>ปีงบประมาณ 2557 - ปัจจุบัน</p>
          </Col>
        </Row>
      </div>
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
