import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'

const DriverInformation = (props) => {
  const { } = props

  return (
    <Card
      title='ข้อมูลคนขับรถ'
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ชื่อ-สกุล'
              name='name'
              placeholder='ชื่อ-สกุล'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='บ้านเลขที่'
              name='house_no'
              placeholder='บ้านเลขที่'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='หมู่'
              name='village_no'
              placeholder='หมู่'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ซอย'
              name='alley'
              placeholder='ซอย'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ถนน'
              name='road'
              placeholder='ถนน'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='ตำบล/แขวง'
              name='district'
              placeholder='ตำบล/แขวง'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='อำเภอ/เขต'
              name='sub_district'
              placeholder='อำเภอ/เขต'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='จังหวัด'
              name='province'
              placeholder='จังหวัด'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
        </Row>
      </section>
    </Card>
  )
}

export default React.memo(DriverInformation)
