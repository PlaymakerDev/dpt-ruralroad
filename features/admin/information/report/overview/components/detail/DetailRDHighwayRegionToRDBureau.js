import React, { useMemo } from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import { DetailCard } from '../detail/detail-card'

const DetailRDHighwayRegionToRDBureau = (props) => {
  const { tabKey } = props

  let page = 1
  let pageSize = 10

  const startIndex = useMemo(() => {
    return (page - 1) * pageSize;
  }, [page, pageSize]);

  const endIndex = useMemo(() => {
    return startIndex + pageSize;
  }, [startIndex, pageSize]);

  const data = [
    {
      key: '16',
      description: 'แบบบันทึกการชั่งน้ำหนักยานพาหนะ (จ.3)',
      urlPreview: '/api/v1/reports/office_to_drr'
    },
    {
      key: '15',
      description: 'แผน-ผลการดำเนินงาน (ภาพรวมของทุก สทช.)',
      urlPreview: '/api/v1/reports/mobile_plan_result_main',
    },
    {
      key: '15',
      description: 'แผน-ผลการดำเนินงานของ ขทช.',
      urlPreview: '/api/v1/reports/mobile_plan_result_sub',
    },
    {
      key: '3',
      description: 'แบบ กสท.05 (ภาพรวมของทุก ขทช.)',
      urlPreview: '/api/v1/reports/mobile_sum_office_all',
    },
    {
      key: '13',
      description: "แบบ กสท.04 (รายสายทาง)",
      urlPreview: '/api/v1/reports/mobile_sum_office_way_id?year=2020&month=01',
    },
    {
      key: '6',
      description: 'แบบรายงานการติดตามคดี (กสท.07)',
      urlPreview: '/api/v1/reports/arrest_list',
    },
    {
      description: 'สำเนาสลิป (กสท.03)',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview?focus=mobile-unit'
    },
    {
      description: 'บันทึกจับกุม (กรณีน้ำหนักเกิน)',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },
    {
      description: 'รูปถ่ายขณะปฏิบัติหน้าที่',
      tab: 'mobile',
      menu: 'overweight',
      urlPreview: '/admin/vehicle-weight/overview'
    },

  ]

  return (
    <Spin spinning={false}>
      {data?.length !== 0 ?
        <Row gutter={[30, 30]}>
          {data?.slice(startIndex, endIndex).map((item, index) => {
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

export default React.memo(DetailRDHighwayRegionToRDBureau)
