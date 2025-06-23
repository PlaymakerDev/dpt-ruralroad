import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Empty, Input, Progress, Row, Spin, Typography } from 'antd'
import { useRouter } from 'next/router'
import stf from '@/utils/stringformat'
import { SearchOutlined } from '@ant-design/icons'

const VehicleOnRoute = (props) => {
  const { data, loading, onSearch } = props
  const router = useRouter()
  const [stateData, setStateData] = useState(null)

  // useEffect(() => {
  //   if (!loading) {
  //     setStateData(data)
  //   }
  // }, [loading, data])

  // const filterData = useCallback((value) => {
  //   let defaultData = data

  //   if (value.length) {
  //     defaultData = data?.filter(item => item.road_code.includes(value))
  //   }

  //   return defaultData
  // }, [data])

  const onSubmit = useCallback(() => {
    onSearch('/api/v1/info/all_vehical_location', { search: stateData }, false)
  }, [stateData])

  const renderVehicleLocation = useMemo(() => {
    if (!data?.length) {
      return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Empty
            description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
          />
        </Col>
      )
    }

    return data?.map((item, index) => {
      return (
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg px-4 py-1 cursor-pointer'
            onClick={() => router.push({
              pathname: `/admin/gps/view/${item.road_id}`,
              query: {
                unique_vehicle: item.unique_vehicles
              }
            })}
          >
            <section className='flex flex-wrap justify-between'>
              <p className='text-[clamp(1px, 4vw, 15px)] font-bold underline'>{item.road_code}</p>
              <p className='text-[clamp(1px, 4vw, 15px)]'>{stf(item.unique_vehicles).normal() || 0} คัน &gt;</p>
            </section>
            <section>
              <Progress
                percent={item.unique_vehicles}
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
  }, [data])

  const checkLoadingState = useMemo(() => {
    if (!loading) {
      return renderVehicleLocation
    } else {
      return <Spin spinning={loading} />
    }
  }, [loading])

  return (
    <div className="card-container rounded-md p-2">
      <section className='grid grid-cols-1 md:grid-cols-2 items-center gap-3'>
        <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>สายทางที่มีปริมาณรถมากที่สุด</h1>
        <div className='flex items-center gap-3'>
          <Input
            placeholder="ค้นหาสายทาง"
            onChange={(event) => setStateData(event.target.value)}
            defaultValue={stateData}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSubmit()
              }
            }}
          // onChange={(event) => {
          //   setStateData(filterData(event.target.value))
          // }}
          />
          <Button
            type="primary"
            className='!bg-blue-500'
            icon={<SearchOutlined />}
            onClick={() => onSubmit()}
            loading={loading}
          >
            ค้นหา
          </Button>
        </div>
      </section>
      <section className='mt-3 overflow-scroll overflow-x-hidden h-[23.5rem]'>
        <Row gutter={[8, 8]}>
          {checkLoadingState}
          {/* {!!data?.length ?
            data?.map((item, index) => {
              return (
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                  <figure
                    className='border-solid border-2 border-lightblue rounded-lg px-4 py-1 cursor-pointer'
                    onClick={() => router.push({
                      pathname: `/admin/gps/view/${item.road_id}`,
                      query: {
                        unique_vehicle: item.unique_vehicles
                      }
                    })}
                  >
                    <section className='flex flex-wrap justify-between'>
                      <p className='text-[clamp(1px, 4vw, 15px)] font-bold underline'>{item.road_code}</p>
                      <p className='text-[clamp(1px, 4vw, 15px)]'>{stf(item.unique_vehicles).normal() || 0} คัน &gt;</p>
                    </section>
                    <section>
                      <Progress
                        percent={item.unique_vehicles}
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
            :
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Empty
                description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
              />
            </Col>
          } */}
        </Row>
      </section>
    </div>
  )
}

export default React.memo(VehicleOnRoute)
