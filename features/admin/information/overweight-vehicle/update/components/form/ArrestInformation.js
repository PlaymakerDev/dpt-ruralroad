import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'

const ArrestInformation = (props) => {
  const { } = props

  return (
    <Card
      title='ข้อมูลการจับกุม'
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section>
        <Row gutter={[16, 16]}>
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ชื่อผู้จับกุม'
              name='arrest_officer_name'
              placeholder='ชื่อผู้จับกุม'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='พยานจับกุม1'
              name='arrest_witness_1'
              placeholder='พยานจับกุม1'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Select
              label='พยานจับกุม2'
              name='arrest_witness_2'
              placeholder='พยานจับกุม2'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='พยานนำส่ง'
              name='delivery_witness'
              placeholder='พยานนำส่ง'
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Checkbox
              name='is_prosecution'
              optKeys={['value', 'label']}
              options={[
                {
                  label: 'ส่งฟ้อง',
                  value: true
                }
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ท้องที่เกิดเหตุ (สภ.)'
              name='incident_location'
              placeholder='ท้องที่เกิดเหตุ (สภ.)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ตำบล'
              name='incident_location_district'
              placeholder='ตำบล'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='อำเภอ'
              name='incident_location_sub_district'
              placeholder='อำเภอ'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='จังหวัด'
              name='incident_location_province'
              placeholder='จังหวัด'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='มูลค่าทรัพย์สินที่เกิดขึ้น'
              name='property_involved_value'
              placeholder='มูลค่าทรัพย์สินที่เกิดขึ้น'
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Field.Checkbox
              name='is_in_review'
              optKeys={['value', 'label']}
              options={[
                {
                  label: 'ศาลพิจารณา',
                  value: true
                }
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ที่ คค 0718.6/'
              name='ref_kk'
              placeholder='ที่ คค 0718.6/'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='สำเนาทะเบียนรถ'
              name='copied_of_driver_license'
              placeholder='สำเนาทะเบียนรถ'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ประเภทใบขับขี่'
              name='driver_license_type'
              placeholder='ประเภทใบขับขี่'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ใบชั่งน้ำหนักจากบริษัท'
              name='company_weight_cetificate'
              placeholder='ใบชั่งน้ำหนักจากบริษัท'
            />
          </Col>
        </Row>
      </section>
    </Card >
  )
}

export default React.memo(ArrestInformation)
