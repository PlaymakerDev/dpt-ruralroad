import React from 'react'
import { FormSearchCargo } from '../form'
import { TableCargo } from '../table'
import { Col, Pagination, Row } from 'antd'

const Cargo = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <FormSearchCargo />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <TableCargo />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <Pagination
          align='center'
          defaultCurrent={1}
          defaultPageSize={10}
        />
      </Col>
    </Row>
  )
}

export default React.memo(Cargo)
