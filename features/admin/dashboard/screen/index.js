"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Col, Row, Spin } from 'antd'
import { CardOverWeightVehicle, CardVehicleStat, CardWeighingStation } from '../components/addon-content/card'
import { CollapseYearSummary } from '../components/addon-content/collapse'
// CREATE API REQUESTS
// import { useAppSelector } from '@/store/hooks'
// import { allowAdmin } from '@/utils/allowAdmin'
import { longdo, map, LongdoMap } from '@/components/map/LongdoMap'

const MAP_KEY = "f7ba675880ccab7ac7fd0a65f1b33553"

const DashboardScreen = (props) => {
  const { } = props
  // USE SELECTOR
  // const user = useAppSelector(state => state.user)

  const initMap = useCallback(() => {
    // map.Layers.setBase(longdo.Layers.GRAY);

    longdo.Map({
      placeholder: "sample",
      language: 'th',
      lastView: false,
      zoom: 13, // เพิ่มค่า zoom เริ่มต้น
      // zoomRange: { min: 12, max: 14 },

      mouse: {
        wheel: false, // ปิดการซูมด้วยลูกกลิ้งเมาส์
      },
    })

    longdo.Marker({ lon: 101.2, lat: 12.8 },
      // {
      //   title: 'Marker',
      //   icon: {
      //     url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
      //     offset: { x: 12, y: 45 }
      //   },
      //   detail: 'Drag me',
      //   visibleRange: { min: 7, max: 9 },
      //   draggable: true,
      //   weight: longdo.OverlayWeight.Top,
      // }
    )

    // ตั้งค่าพื้นฐานของแผนที่
    map.Layers.setBase(longdo.Layers.NORMAL)

    // แสดงเครื่องมือบนแผนที่
    map.Ui.DPad.visible(false)
    map.Ui.Zoombar.visible(false)
    map.Ui.Geolocation.visible(false)
    map.Ui.Toolbar.visible(false)
    map.Ui.LayerSelector.visible(false)
    map.Ui.Fullscreen.visible(false)
    map.Ui.Crosshair.visible(false)
    map.Ui.Scale.visible(false)
  }, []);

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
              <LongdoMap id="longdo-map" mapKey={MAP_KEY} callback={initMap} />
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
