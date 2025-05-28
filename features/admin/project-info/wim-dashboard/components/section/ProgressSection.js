import React, { useMemo } from 'react'
import { Col, Progress, Row, Tooltip } from 'antd'
import { useAppSelector } from '@/store/hooks'
import stf from '@/utils/stringformat'

const ProgressSection = (props) => {
  const { } = props
  const data = useAppSelector(state => state.dashboard.vehicle_class)

  const progressData = useMemo(() => {
    const arrData = data?.data?.column?.map((item, index) => {
      const percent = data?.data?.percent
      const value = data?.data?.value
      return {
        description: item,
        percent: percent[index],
        value: value[index],
      }
    })
    return arrData || []
  }, [data])

  // const mockData = [
  //   {
  //     title: "TestTitle1",
  //     subtitle: "TestDescription1",
  //     value: 10
  //   },
  //   {
  //     title: "TestTitle1",
  //     subtitle: "TestDescription1",
  //     value: 20
  //   },
  //   {
  //     title: "TestTitle3",
  //     subtitle: "TestDescription3",
  //     value: 30
  //   },
  //   {
  //     title: "TestTitle1",
  //     subtitle: "TestDescription1",
  //     value: 10
  //   },
  //   {
  //     title: "TestTitle1",
  //     subtitle: "TestDescription1",
  //     value: 20
  //   },
  // ]

  const renderProgress = useMemo(() => {
    if (!progressData?.length) return

    const topRecord = progressData?.slice(0, 5)
    const sortArr = topRecord?.sort((a, b) => {
      return b.value - a.value
    })

    const loopArrData = sortArr?.map((item, index) => {
      const lastIndex = index === sortArr.length - 1;
      return (
        <div className={sortArr?.length > 5 ? 'pr-3' : ''}>
          <Row gutter={[16, 0]} className='items-center my-[0.6rem]'>
            <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
              <Tooltip title={item.description}>
                <h3 className='text-[clamp(1rem, 4vw, 15rem)] font-bold truncate'>{item.description || '-'}</h3>
              </Tooltip>
              <p>สัดส่วนยานพาหนะ</p>
            </Col>
            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
              <Tooltip title={item.percent + "%"}>
                <Progress
                  percent={item.value}
                  size={'small'}
                  strokeColor={'#56E4EE'}
                  percentPosition={{
                    align: 'end',
                    type: 'outer',
                  }}
                  // showInfo={false}
                  trailColor={'#294C4F'}
                  format={() => stf(item.value).normal() + ' คัน'}
                  status='normal'
                />
              </Tooltip>
            </Col>
          </Row>
          {!lastIndex && <hr className='hr-boundary' />}
        </div>
      )
    })
    return loopArrData
  }, [progressData])

  return (
    <div className='bg-[#030918] border-[#56E4EE50] border-[1px] rounded-md p-2'>
      <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>5 อันดับสัดส่วนประเภทยานพาหนะ</h1>
      {/* CONTENT */}
      <div className='mt-3 h-80 overflow-auto overflow-x-hidden'>
        {renderProgress}
      </div>
    </div>
  )
}

export default React.memo(ProgressSection)
