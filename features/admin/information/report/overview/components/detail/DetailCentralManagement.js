import React, { useMemo } from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import { DetailCard } from '../detail/detail-card'

const DetailCentralManagement = (props) => {
  const { } = props

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
      description: 'รายงานรวม'
    },
    {
      description: 'กราฟภาพรวมทั้งประเทศ'
    },
    {
      description: 'กสท.04 ราย สทช.'
    },
    {
      description: 'กสท.05 ราย จังหวัด'
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
