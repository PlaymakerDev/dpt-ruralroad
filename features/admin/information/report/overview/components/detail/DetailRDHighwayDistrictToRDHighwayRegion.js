import React, { useMemo } from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import { DetailCard } from '../detail/detail-card'


const DetailRDHighwayDistrictToRDHighwayRegion = (props) => {
  const { tabKey } = props

  const data = [
    {
      key: '16',
      description: 'แบบบันทึกการชั่งน้ำหนักยานพาหนะ (จ.3)',
      // urlPreview : '/api/v1/reports/province_to_office?start_date=2024-08-01&end_date=2024-10-30&file_type=pdf&department_id=95'
      urlPreview: '/api/v1/reports/office_to_drr'
    },
    {
      key: '15',
      description: 'แผน-ผลการดำเนินงาน (ภาพรวมของทุก ขทช.)',
      urlPreview: '/api/v1/reports/mobile_plan_result_sub?year_type=ce_year&plan_year=2023&file_type=pdf'
    },
    {
      description: 'รูปถ่ายขณะปฏิบัติหน้าที่',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },
    {
      description: 'แบบรายงานน้ำหนักแต่ละเพลา (กสท.06)',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },
    {
      description: 'สำเนาสลิป (กสท.03)',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },
    {
      description: 'บันทึกจับกุม (กรณีน้ำหนักเกิน)',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    }

  ]

  return (
    <Spin spinning={false}>
      {data?.length !== 0 ?
        <Row gutter={[30, 30]}>
          {data?.slice().map((item, index) => {
            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={index}>

                <DetailCard
                  index={index}
                  data={item}
                  url={'/admin/information/report/preview/1'}
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

export default React.memo(DetailRDHighwayDistrictToRDHighwayRegion)
