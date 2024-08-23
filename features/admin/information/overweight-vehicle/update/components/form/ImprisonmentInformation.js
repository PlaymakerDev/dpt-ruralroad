import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'

const ImprisonmentInformation = (props) => {
  const { } = props

  return (
    <Card
      title='ข้อมูลการจำคุก'
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='รอลงอาญา (ปี)'
              name='suspended_sentence_by_year'
              placeholder='รอลงอาญา (ปี)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='จำคุก (เดือน)'
              name='imprisonment_by_month'
              placeholder='จำคุก (เดือน)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='กักขัง (เดือน)'
              name='custody_by_month'
              placeholder='กักขัง (เดือน)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='คุมประพฤติ (ปี)'
              name='probation_by_year'
              placeholder='คุมประพฤติ (ปี)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ปรับเป็นเงิน (บาท)'
              name='fine_by_baht'
              placeholder='ปรับเป็นเงิน (บาท)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='รายการริบทรัพย์'
              name='asset_forfeiture_list'
              placeholder='รายการริบทรัพย์'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='หมายเลขคดี'
              name='case_number'
              placeholder='หมายเลขคดี'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.DatePicker
              label='วัน/เดือน/ปี เลขคดี'
              name='case_number_date'
              placeholder='วัน/เดือน/ปี เลขคดี'
            />
          </Col>
        </Row>
      </section>
    </Card>
  )
}

export default React.memo(ImprisonmentInformation)
