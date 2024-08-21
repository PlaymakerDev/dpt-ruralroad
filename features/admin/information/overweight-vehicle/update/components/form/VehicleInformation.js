import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'

const VehicleInformation = (props) => {
  const { } = props

  return (
    <Card>
      <Typography.Title level={5}>ข้อมูลรถบรรทุก</Typography.Title>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Field.Input
              label='ยี่ห้อรถ'
              name='vehicle_model'
              placeholder='ยี่ห้อรถ'
            />
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Field.Input
              label='ทะเบียนรถหัวลาก'
              name='tractor_unit_license_plate'
              placeholder='ทะเบียนรถหัวลาก'
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Field.Select
              label='จังหวัดหัวลาก'
              name='tractor_unit_province'
              placeholder='จังหวัดหัวลาก'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Field.Input
              label='ทะเบียนรถหางลาก'
              name='trailer_license_plate'
              placeholder='ทะเบียนรถหางลาก'
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Field.Select
              label='จังหวัดหางลาก'
              name='trailer_province'
              placeholder='จังหวัดหางลาก'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
        </Row>
      </section>
    </Card>
  )
}

export default React.memo(VehicleInformation)
