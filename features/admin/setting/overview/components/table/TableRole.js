import React, { useMemo } from 'react'
import { Col, Empty, Row, Spin } from 'antd'
import { RoleDetailCard } from './detail-card'

const TableRole = (props) => {
  const { setOpen } = props

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
      description: 'วิศวกรโยธาเชี่ยวชาญ'
    },
    {
      description: 'ช่างเทคนิค'
    },
    {
      description: 'ผู้ช่วยช่างทั่วไป ระดับ ช.2'
    },
    {
      description: 'วิศวกรเครื่องกล (พร.)'
    },
  ]

  return (
    <Spin spinning={false}>
      {data?.length !== 0 ?
        <Row gutter={[30, 30]}>
          {data?.slice(startIndex, endIndex).map((item, index) => {
            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={index}>
                <RoleDetailCard
                  index={index}
                  data={item}
                  setOpen={setOpen}
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

export default React.memo(TableRole)
