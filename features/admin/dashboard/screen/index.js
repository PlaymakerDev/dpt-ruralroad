"use client"
import React from 'react'
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
      <div className='!-mt-6 !h-[80%]'>
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
              Test
            </Col>
          </Row>
        </section>
        {/* {allowAdmin(user.map_group_name) && */}
        <section className='mt-3'>
          <figure className='overflow-hidden rounded-md'>
            <CollapseYearSummary />
          </figure>
        </section>
        {/* } */}
      </div >
      {/* <div className="!-mt-6 !border !border-violet-50 !h-[80%]">
        <section className="!h-full">
          <div
            className="!flex !flex-nowrap !h-full !border !border-t-cyan-100"
          >
            <div
              className="!border !border-green-500 !flex-1 !h-full !overflow-hidden"
            >
              <MainContentLeft />
            </div>
            <div
              className="!border !border-y-fuchsia-600 !flex-1 !h-full !overflow-hidden"
            >
              <MainContentRight />
            </div>
          </div>
        </section>
      </div> */}
    </>
  )
}

export default React.memo(DashboardScreen)
