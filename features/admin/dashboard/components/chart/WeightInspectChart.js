import React from 'react'
import { Avatar, Card, Col, Row, Typography } from 'antd'
import { TruckOutlined } from '@ant-design/icons'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WeightInspectChart = (props) => {
  const { } = props

  const series = [
    {
      name: 'South',
      data: [
        { x: new Date('2024-08-01').getTime(), y: 30 },
        { x: new Date('2024-08-02').getTime(), y: 40 },
        { x: new Date('2024-08-03').getTime(), y: 35 },
        { x: new Date('2024-08-04').getTime(), y: 50 },
        { x: new Date('2024-08-05').getTime(), y: 49 },
        { x: new Date('2024-08-06').getTime(), y: 60 },
        { x: new Date('2024-08-07').getTime(), y: 70 },
        { x: new Date('2024-08-08').getTime(), y: 91 }
      ]
    },
    {
      name: 'North',
      data: [
        { x: new Date('2024-08-01').getTime(), y: 30 },
        { x: new Date('2024-08-02').getTime(), y: 40 },
        { x: new Date('2024-08-03').getTime(), y: 35 },
        { x: new Date('2024-08-04').getTime(), y: 50 },
        { x: new Date('2024-08-05').getTime(), y: 49 },
        { x: new Date('2024-08-06').getTime(), y: 60 },
        { x: new Date('2024-08-07').getTime(), y: 70 },
        { x: new Date('2024-08-08').getTime(), y: 91 }
      ]
    },
    {
      name: 'Central',
      data: [
        { x: new Date('2024-08-01').getTime(), y: 30 },
        { x: new Date('2024-08-02').getTime(), y: 40 },
        { x: new Date('2024-08-03').getTime(), y: 35 },
        { x: new Date('2024-08-04').getTime(), y: 50 },
        { x: new Date('2024-08-05').getTime(), y: 49 },
        { x: new Date('2024-08-06').getTime(), y: 60 },
        { x: new Date('2024-08-07').getTime(), y: 70 },
        { x: new Date('2024-08-08').getTime(), y: 91 }
      ]
    }
  ]

  const options = {
    chart: {
      type: 'area',
      height: 350,
      stacked: true,
      events: {
        selection: function (chart, e) {
          console.log(new Date(e.xaxis.min))
        }
      },
    },
    colors: ['#008FFB', '#00E396', '#CED4DC'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'monotoneCubic'
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      }
    },
    legend: {
      // position: 'top',
      // horizontalAlign: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
  }

  return (
    <Card className='!w-full !h-full'>
      <section>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
            <Typography.Title level={4} className='!m-0'>แผนงานและผลการจัดตั้งหน่วยชั่งเคลื่อนที่</Typography.Title>
            <Typography.Text>ประจำปีงบประมาณ 2567</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
            <section className='flex flex-wrap justify-between'>
              <div className='flex gap-3 items-center'>
                <div className='flex'>
                  <Avatar
                    icon={<TruckOutlined />}
                    className='!bg-[#56E4EE]'
                    size={'large'}
                    />
                </div>
                <div className='flex flex-col'>
                  <Typography.Title level={5} className='!m-0'>175 ครั้ง</Typography.Title>
                  <Typography.Text>แผนที่วางไว้</Typography.Text>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='flex'>
                  <Avatar
                    icon={<TruckOutlined />}
                    className='!bg-[#E81A1A]'
                    size={'large'}
                  />
                </div>
                <div className='flex flex-col'>
                  <Typography.Title level={5} className='!m-0'>175 ครั้ง</Typography.Title>
                  <Typography.Text>แผนที่วางไว้</Typography.Text>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <Chart
          series={series}
          options={options}
          type='area'
        />
      </section>
    </Card>
  )
}

export default React.memo(WeightInspectChart)
