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

const ChartLastSevenDays = (props) => {
  const { data } = props

  console.log("data", data)

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
    const total = [];
    const over = [];
    // ASSIGN DATA
    data?.column?.forEach((currentData) => {
      categories.push(currentData);
    })

    data?.total?.forEach((currentData) => {
      total.push(Number(currentData));
    })

    data?.over?.forEach((currentData) => {
      over.push(Number(currentData));
    })
    // RETURN VALUE
    return {
      categories,
      series: [
        {
          name: 'รถทั้งหมด',
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
        type='area'
        series={areaDataNormalize.series || []}
        height={282}
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
            fontFamily: 'IBMPlexSansThai-Regular, Arial, sans-serif',
            offsetX: 0,
            offsetY: 10,
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
          colors: ["#56E4EE", "#FF6362"]
        }}
      />
    )
  }, [areaDataNormalize])

  return (
    <>
      <section>
        <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>แนวโน้มย้อนหลัง 7 วัน</h1>
      </section>
      <section className='mt-2'>
        {renderChart}
      </section>
    </>
  )
}

export default React.memo(ChartLastSevenDays)
