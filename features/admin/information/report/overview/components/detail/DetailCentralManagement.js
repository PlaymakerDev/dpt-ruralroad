import React, { useMemo } from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import { DetailCard } from '../detail/detail-card'
import dayjs from 'dayjs'

const DetailCentralManagement = (props) => {
  const { tabKey } = props

  const yearNow = dayjs().year();
  const monthNow = dayjs().month();

  const datas = [
    {
      key: '1',
      description: 'รายงานรวม',
      urlPreview: `/api/v1/reports/exclusive?year_type=ce_year&plan_year=${yearNow}&file_type=pdf`
    },
    {
      key: '2',
      description: 'กราฟภาพรวมทั้งประเทศ',
      urlPreview: `/api/v1/reports/mobile_plan_result_main?year_type=ce_year&plan_year=${yearNow}&file_type=pdf`
    },
    {
      key: '3',
      description: 'กสท.04 ราย สทช.',
      urlPreview: `/api/v1/reports/mobile_sum_office_all?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&option=cumulative&month=${monthNow}`
    },
    {
      key: '4',
      description: 'กสท.05 ราย จังหวัด',
      urlPreview: `/api/v1/reports/mobile_sum_office_year?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&option=cumulative&month=${monthNow}`
    },
    {
      key: '5',
      description: 'บูรณาการ ทุกหน่วย',
      urlPreview: `/api/v1/reports/weight_collaboration?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&option=monthly&month=${monthNow}`
    },
    {
      key: '6',
      description: 'กสท.07 ติดตามคดีทุกหน่วย',
      urlPreview: `/api/v1/reports/arrest_list?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&option=cumulative&station_type_id=2`
    },
    {
      key: '7',
      description: 'สรุปรายงานผลการกำกับน้ำหนักยานพาหนะ',
      urlPreview: '/api/v1/reports/weight_sum_year?file_type=pdf'
    },
    {
      key: '8',
      description: 'ตารางสรุปการกำกับสถานีตรวจสอบน้ำหนัก',
      urlPreview: `/api/v1/reports/station_sum_monthly?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&station_id=1`
    },
    {
      key: '9',
      description: 'ตารางสรุปการกำกับสถานีตรวจสอบน้ำหนักเครื่องชั่งอัตโนมัติ (VIS)',
      urlPreview: `/api/v1/reports/wim_sum_monthly?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&station_id=1`
    },
    {
      key: '10',
      description: 'รูปแสดงการร่วมบูรณาการ',
      urlPreview: '/admin/information/collaboration-and-integration'
    },
    {
      key: '11',
      description: 'รายงานสรุปผลการตรวจสอบรถบรรทุกน้ำหนัก (VIS)',
      urlPreview: `/api/v1/reports/wim_sum_daily?year_type=ce_year&plan_year=${yearNow}&file_type=pdf&option=cumulative&plan_month=${monthNow}&station_id=1`
    },
    {
      key: '12',
      description: 'รายงานปริมาณบรรทุกที่ผ่านตามช่วงเวลา (VIS)',
      urlPreview: '/api/v1/reports/wim_sum_period_daily?year_type=ce_year&plan_year=2023&file_type=pdf&station_id=1&plan_month=1'
    },
  ]


  return (
    <Spin spinning={false}>
      {datas?.length !== 0 ?
        <Row gutter={[30, 30]}>
          {datas?.slice().map((item, index,) => {
            

            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={index}>
                <DetailCard
                  index={index}
                  data={item}
                  url={`/admin/information/report/preview/1`}
                  tabKey={tabKey}
                />
              </Col>
            )
          })}
        </Row>
        :
        <Row gutter={[30, 30]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className='p-12'>
              <Empty
                description='No Data'
              />
            </div>
          </Col>
        </Row>
      }
    </Spin>
  )
}

export default React.memo(DetailCentralManagement)
