import React from 'react'
import { Col, Row } from 'antd'
import { MainContentLeft, MainContentRight } from '../components/main-content'
import { CollapseYearSummary } from '../components/addon-content/collapse'
// CREATE API REQUESTS
import { useAppSelector } from '@/store/hooks'
import { allowAdmin } from '@/utils/allowAdmin'

const DashboardScreen = (props) => {
  const { } = props
  // USE SELECTOR
  const user = useAppSelector(state => state.user)

  return (
    <>
      <div className='!-mt-6 !h-[80%]'>
        <section>
          <Row gutter={[16, 16]} >
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14} >
              <MainContentLeft />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={10} >
              <MainContentRight />
            </Col>
          </Row>
        </section>
        {allowAdmin(user.map_group_name) &&
          <section section className='mt-3'>
            <CollapseYearSummary />
          </section>
        }
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
