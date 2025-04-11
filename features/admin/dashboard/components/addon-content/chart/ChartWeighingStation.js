import React, { useMemo } from 'react'
import { Avatar, Card, Col, Row, Typography } from 'antd'
// import { TruckOutlined } from '@ant-design/icons'
import { TruckIcon } from '@/components/icon';
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { generateDaysOfMonth } from '@/utils/datetime'
import format from '@/utils/stringformat'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

dayjs.extend(customParseFormat);

const ChartWeighingStation = (props) => {
  const { data } = props
  // FIND TOTAL
  const findTotal = useMemo(() => {
    let total = 0
    let over = 0
    data?.forEach((item) => {
      total += Number(item.total),
        over += Number(item.over)
    })
    return {
      total: format(total).normal(),
      over: format(over).normal(),
    }
  }, [data])

  // RENDER BAR CHART
  const barDataNormalize = useMemo(() => {
    // CHECK IF DATA EXIST
    const isEmpty = !data;
    if (isEmpty) {
      const currentMonthNumber = generateDaysOfMonth(dayjs().daysInMonth());
      return {
        categories: currentMonthNumber,
        series: []
      }
    }
    // INITIALISE DATA
    const categories = [];
    const total = [];
    const over = [];
    // ASSIGN DATA
    data?.forEach((currentData) => {
      categories.push(dayjs(currentData?.create_date, 'DD/MM/YYYY').locale('th').format('DD/MM'));
      total.push(Number(currentData?.total));
      over.push(Number(currentData?.over));
    })
    // RETURN VALUE
    return {
      categories,
      series: [
        {
          name: 'รถเข้าชั่ง',
          data: total
        },
        {
          name: 'รถน้ำหนักเกิน',
          data: over
        },
      ]
    }
  }, [data]);

  // RENDER CHART
  const renderChart = useMemo(() => {
    return (
      <Chart
        type='bar'
        series={barDataNormalize.series || []}
        height={282}
        options={{
          states: {
            hover: {
              filter: {
                type: 'darken',
                value: 0.75,
              },
            },
          },
          legend: {
            labels: {
              colors: '#FFFFFF80',
            },
            offsetY: '12',
            markers: {
              shape: 'line',
              strokeWidth: 5,
              size: 14,
            },
          },
          dataLabels: {
            enabled: false,
          },
          chart: {
            zoom: {
              enabled: true,
              type: 'x',
            },
            stacked: false,
            toolbar: {
              show: false,
            },
            fontFamily: 'IBMPlexSansThai-Regular, Arial, sans-serif',
            offsetX: 0, 
            offsetY: 10, 
          },
          grid: {
            padding: {
              left: 0,  
              right: 0,   
              top: -25,     
              bottom: -20,  
            },
            
          },
          xaxis: {
            categories: barDataNormalize?.categories || [],
            tickPlacement: 'on',
            tickAmount: 25,
            labels: {
              style: {
                colors: '#FFFFFF80',
              },
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => {
                return format(value).normal();
              },
              style: {
                colors: '#FFFFFF80',
              },
            },
          },
          fill: {
            opacity: 1,
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'vertical',
              shadeIntensity: 0.5,
              gradientToColors: undefined,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops: [],
            },
          },
          noData: {
            text: 'ไม่มีข้อมูล',
          },
          tooltip: {
            x: {
              formatter: (value, { dataPointIndex }) => {
                return barDataNormalize?.categories[dataPointIndex];
              },
            },
            y: {
              formatter: (value) => {
                return format(value).normal();
              },
            },
          },
          colors: ['#56E4EE', '#FF4A4A'],
        }}
      />

    )
  }, [barDataNormalize])

  return (
    <div>
      <section>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
            <Typography.Title level={4} className='!m-0' style={{ fontSize: 'clamp(1px, 4vw, 15px)' }}>ผลการตรวจสอบน้ำหนักสถานี</Typography.Title>
            <Typography.Text className='!text-[#FFFFFF80]'>ผลการดำเนินการจัดตั้ง 7 วันล่าสุด</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
            <section className='flex flex-wrap justify-between'>
              <div className='flex gap-3 items-center'>
                <div className='flex'>
                  <Avatar
                    // icon={<TruckOutlined />}
                    icon={<TruckIcon width={23} height={16} customFill='#FFFFFF' />}
                    className='!bg-[#56E4EE80]'
                    size={'large'}
                  />
                </div>
                <div className='flex flex-col'>
                  <Typography.Title level={5} className='!m-0'>{findTotal.total || 0} ครั้ง</Typography.Title>
                  <Typography.Text className='!text-[#FFFFFF80]'>รถเข้าชั่ง</Typography.Text>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='flex'>
                  <Avatar
                    // icon={<TruckOutlined />}
                    icon={<TruckIcon width={23} height={16} customFill='#FFFFFF' />}
                    className='!bg-[#E81A1A80]'
                    size={'large'}
                  />
                </div>
                <div className='flex flex-col'>
                  <Typography.Title level={5} className='!m-0'>{findTotal.over || 0} ครั้ง</Typography.Title>
                  <Typography.Text className='!text-[#FFFFFF80]'>รถน้ำหนักเกิน</Typography.Text>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </section>
      <section className='mt-2'>
          {renderChart}
      </section>
    </div>
  )
}

export default React.memo(ChartWeighingStation)
