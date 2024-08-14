import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import Image from 'next/image'
import TruckOverall from '@/public/images/truck-overall.svg'
import TruckInspect from '@/public/images/truck-inspect.svg'
import TruckWIM from '@/public/images/truck-wim.svg'
import TruckWeight from '@/public/images/truck-weight.svg'

const CarEntrySection = (props) => {
  const { } = props

  const gridStyle = {
    width: '25%',
    textAlign: 'center'
  }

  return (
    <Card>
      <Card.Grid hoverable={false} style={gridStyle}>
        <Typography.Title level={4}>รวมรถเข้าชั่งทั้งหมด</Typography.Title>
        <Image
          src={TruckOverall}
          alt='truck-overall'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>บรรจุเกิน</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <Typography.Title level={4}>รวมรถเข้าชั่งทั้งหมด</Typography.Title>
        <Image
          src={TruckInspect}
          alt='truck-inspect'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>บรรจุเกิน</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <Typography.Title level={4}>รวมรถเข้าชั่งทั้งหมด</Typography.Title>
        <Image
          src={TruckWIM}
          alt='truck-wim'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>บรรจุเกิน</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        <Typography.Title level={4}>รวมรถเข้าชั่งทั้งหมด</Typography.Title>
        <Image
          src={TruckWeight}
          alt='truck-weight'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Typography.Text>บรรจุเกิน</Typography.Text><br />
            <Typography.Text>517</Typography.Text><br />
            <Typography.Text>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  )
}

export default React.memo(CarEntrySection)
