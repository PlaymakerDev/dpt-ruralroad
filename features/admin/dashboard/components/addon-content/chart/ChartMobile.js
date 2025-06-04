import React, { useMemo } from 'react'
import { Avatar, Card, Col, Row, Typography } from 'antd'
// import { TruckOutlined } from '@ant-design/icons'
import { TruckIcon } from '@/components/icon'
import format from '@/utils/stringformat'
import dynamic from "next/dynamic";
import { generateDaysOfMonth } from '@/utils/datetime';
import dayjs from 'dayjs';
// import { div } from '@/utils/calculate';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartMobile = (props) => {
  const { data } = props

  // RENDER BAR CHART
  const areaDataNormalize = useMemo(() => {
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
    const plan = [];
    const result = [];
    // ASSIGN DATA
    data?.item?.forEach((currentData) => {
      categories.push(currentData?.month);
      plan.push(Number(currentData?.plan));
      result.push(Number(currentData?.result));
    })
    // RETURN VALUE
    return {
      categories,
      series: [
        {
          name: 'แผน',
          data: plan
        },
        {
          name: 'ผลดำเนินงาน',
          data: result
        },
      ]
    }
  }, [data]);

  // RENDER CHART
  const renderChart = useMemo(() => {
    return (
      <Chart
        type='area'
        series={areaDataNormalize.series || []}
        height={300}
        options={{
          grid: {
            padding: {
              left: 0,
              right: 0,
              top: -25,
              bottom: -20,
            },
          },
          states: {
            hover: {
              filter: {
                type: 'darken',
                value: 0.75
              }
            }
          },
          legend: {
            labels: {
              colors: '#FFFFFF80'
            },
            markers: {
              shape: 'line',
              strokeWidth: 4,
              size: 16,
              strokeLinecap: 'round',
            }
          },
          dataLabels: {
            enabled: false,
            formatter: (val) => {
              return areaDataNormalize?.series.length <= 1 ? "" : Number(val);
            }
          },
          chart: {
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            selection: {
              enabled: false,
            },
            stacked: false,
            toolbar: {
              show: false,
            },
            fontFamily: 'IBMPlexSansThai-Regular, Arial, sans-serif'
          },
          xaxis: {
            categories: areaDataNormalize?.categories || [],
            tickPlacement: 'on',
            tickAmount: 25,
            labels: {
              style: {
                colors: '#FFFFFF80'
              }
            }
          },
          yaxis: {
            labels: {
              formatter: (value) => {
                return format(value).normal()
              },
              style: {
                colors: '#FFFFFF80'
              }
            }
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
          noData: {
            text: 'ไม่มีข้อมูล',
          },
          toolbar: {
            show: false, // ปิด toolbar ด้านบนของกราฟ
          },
          tooltip: {
            enabled: true,
            theme: 'dark',
            x: {
              formatter: (value, { dataPointIndex }) => {
                // แสดง label ที่ตรงกับ dataPointIndex
                return areaDataNormalize?.categories[dataPointIndex];
              },
            },
            y: {
              formatter: (value) => {
                return format(value).normal()
              }
            }
          },
          colors: ["#56E4EE", "#00E66C"]
        }}
      />
    )
  }, [areaDataNormalize])

  return (
    <>
      <section>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
            <Typography.Title level={4} className='!m-0' style={{ fontSize: 'clamp(1px, 4vw, 15px)' }}>แผนงานและผลการจัดตั้งหน่วยชั่งเคลื่อนที่</Typography.Title>
            <Typography.Text className='!text-[#FFFFFF80]'>ประจำปีงบประมาณ {dayjs().month() > 8 ? dayjs().year() + 1 + 543 : dayjs().year() + 543}</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
            <section className='flex flex-wrap justify-end gap-10'>
              <div className='flex gap-3 items-center'>
                <div className='flex'>
                  <Avatar
                    // icon={<TruckOutlined />}
                    icon={<TruckIcon width={23} height={16} customFill='#FFFFFF' />}
                    className='!bg-[#56E4EE80]'
                    size={'default'}
                  />
                </div>
                <div className='flex flex-col'>
                  <Typography.Title level={5} className='!m-0'>{format(data.all_sum.plan_total).normal() || 0} ครั้ง</Typography.Title>
                  <Typography.Text className='!text-[#FFFFFF80]'>แผนที่วางไว้</Typography.Text>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='flex'>
                  <Avatar
                    // icon={<TruckOutlined />}
                    icon={<TruckIcon width={23} height={16} customFill='#FFFFFF' />}
                    className='!bg-[#21D475]'
                    size={'default'}
                  />
                </div>
                <div className='flex flex-col'>
                  <Typography.Title level={5} className='!m-0'>{format(data.all_sum.result_total).normal() || 0} ครั้ง</Typography.Title>
                  <Typography.Text className='!text-[#FFFFFF80]'>ผลที่ดำเนินการ</Typography.Text>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        {renderChart}
      </section>
    </>
  )
}

export default React.memo(ChartMobile)
