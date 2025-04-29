import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Row, Spin } from 'antd'
import { CardOverWeightVehicle, CardRoute, CardVehicleStat, CardWeighingStation } from '../components/addon-content/card'
import { CollapseYearSummary } from '../components/addon-content/collapse'
import DisplayMap from '../components/map/DisplayMap'
// CREATE API REQUESTS
// import { useAppSelector } from '@/store/hooks'
// import { allowAdmin } from '@/utils/allowAdmin'

const DashboardScreen = (props) => {
  const { authType } = props
  // USE SELECTOR
  // const user = useAppSelector(state => state.user)

  return (
    <>
      <div className='!mt-6 !h-[80%]'>
        <section>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
              <CardVehicleStat
              authType={authType}
              />
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
              <DisplayMap />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <CardRoute />
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
