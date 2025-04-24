import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Row, Spin } from 'antd'
import { CardOverWeightVehicle, CardVehicleStat, CardWeighingStation } from '../components/addon-content/card'
import { CollapseYearSummary } from '../components/addon-content/collapse'
// CREATE API REQUESTS
// import { useAppSelector } from '@/store/hooks'
// import { allowAdmin } from '@/utils/allowAdmin'

const MAP_KEY = "f7ba675880ccab7ac7fd0a65f1b33553"

const DashboardScreen = (props) => {
  const { } = props
  // USE SELECTOR
  // const user = useAppSelector(state => state.user)

  return (
    <>
      <div className='!mt-6 !h-[80%]'>
        <section>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
              <CardVehicleStat />
            </Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <CardWeighingStation />
            </Col>
          </Row>
        </section>
        <section className='mt-3'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={4}>
              <CardOverWeightVehicle />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={20}>
            </Col>
          </Row>
        </section>
        <section className='mt-3'>
          <figure className='overflow-hidden rounded-md'>
            <CollapseYearSummary />
          </figure>
        </section>
      </div >
    </>
  )
}

export default React.memo(DashboardScreen)
