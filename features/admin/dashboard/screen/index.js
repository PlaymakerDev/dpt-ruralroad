import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Row, Spin } from 'antd'
import { CardCCTV, CardOverWeightVehicle, CardRoute, CardVehicleStat, CardWeighingStation } from '../components/addon-content/card'
import { CollapseYearSummary } from '../components/addon-content/collapse'
import DisplayMap from '../components/map/DisplayMap'
import CCTVSection from '../components/cctv/CCTVSection'
// CREATE API REQUESTS
// import { useAppSelector } from '@/store/hooks'
// import { allowAdmin } from '@/utils/allowAdmin'

const DashboardScreen = (props) => {
  const { accessType } = props
  // USE SELECTOR
  // const user = useAppSelector(state => state.user)

  return (
    <>
      {/* <div className='!mt-6 !h-[80%]'> */}
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <CardVehicleStat
                  accessType={accessType}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
                <CardOverWeightVehicle />
              </Col>
              <Col xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
                <DisplayMap
                  accessType={accessType}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={24}>
                <CardWeighingStation />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={24}>
                <CCTVSection />
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className='mt-3'>
        <CollapseYearSummary />
      </section>
    </>
  )
}

export default React.memo(DashboardScreen)
