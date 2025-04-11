import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import { Field } from '@/components/form'

const ImprisonmentInformation = (props) => {
  const { } = props

  return (
    <Card
      title={<Typography.Text className='!m-0 !text-white'>ข้อมูลการจำคุก</Typography.Text>}
      classNames={{
        header: '!bg-[#56E4EE23]'
      }}
    >
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='รอลงอาญา (ปี)'
              name='parole_year'
              placeholder='รอลงอาญา (ปี)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='จำคุก (เดือน)'
              name='jail_month'
              placeholder='จำคุก (เดือน)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='กักขัง (เดือน)'
              name='imprison_month'
              placeholder='กักขัง (เดือน)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='คุมประพฤติ (ปี)'
              name='probation_year'
              placeholder='คุมประพฤติ (ปี)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='ปรับเป็นเงิน (บาท)'
              name='fine'
              placeholder='ปรับเป็นเงิน (บาท)'
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
            <Field.Input
              label='รายการริบทรัพย์'
              name='sequestrate_list'
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
              name='case_date_time'
              placeholder='วัน/เดือน/ปี เลขคดี'
              format={'DD MMMM YYYY'}
            />
          </Col>
        </Row>
      </section>
    </Card>
  )
}

export default React.memo(ImprisonmentInformation)
