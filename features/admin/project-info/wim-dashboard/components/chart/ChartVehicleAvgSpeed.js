import React, { useMemo } from 'react'
import { Avatar, Card, Col, Row, Typography } from 'antd'
// import { TruckOutlined } from '@ant-design/icons'
// import { TruckIcon } from '@/components/icon';
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { generateDaysOfMonth } from '@/utils/datetime'
import format from '@/utils/stringformat'
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

dayjs.extend(customParseFormat);

const ChartVehicleAvgSpeed = (props) => {
  const { data } = props
  console.log("data", data)

  // RENDER BAR CHART
  const lineDataNormalize = useMemo(() => {
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
    const speed = [];
    // ASSIGN DATA
    data?.column[0]?.forEach((currentData) => {
      categories.push(dayjs(currentData, 'HH:mm').locale('th').format('HH:mm'));
    })

    data?.value[0]?.forEach((currentData) => {
      speed.push(Number(currentData));
    })
    // RETURN VALUE
    return {
      categories,
      series: [
        {
          name: 'ความเร็วเฉลี่ย',
          data: speed
        },
      ]
    }
  }, [data]);

  // RENDER CHART
  const renderChart = useMemo(() => {
    return (
      <Chart
        type='line'
        series={lineDataNormalize.series || []}
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
            offsetY: '12',
            markers: {
              shape: 'line',
              strokeWidth: 5,
              size: 14,
            },
          },
          dataLabels: {
            enabled: false,
            // formatter: (val) => {
            //   return lineDataNormalize?.series.length <= 1 ? "" : Number(val);
            // }
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
            fontFamily: 'IBM Plex Sans Thai, Arial, sans-serif',
            offsetX: 0,
            offsetY: 10,
          },
          xaxis: {
            categories: lineDataNormalize?.categories || [],
            tickPlacement: 'on',
            tickAmount: 25,
            labels: {
              show: false,
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
          fill: {
            opacity: 1,
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              // stops: [0, 50, 100],
              colorStops: []
            }
          },
          noData: {
            text: 'ไม่มีข้อมูล',
          },
          tooltip: {
            x: {
              formatter: (value, { dataPointIndex }) => {
                // แสดง label ที่ตรงกับ dataPointIndex
                return lineDataNormalize?.categories[dataPointIndex];
              },
            },
            y: {
              formatter: (value) => {
                return format(value).normal()
              }
            }
          },
          colors: ["#56E4EE", "#FF4A4A"]
        }}
      />
    )
  }, [lineDataNormalize])

  return (
    <div>
      <section>
        <Typography.Title level={4} className='!m-0' style={{ fontSize: 'clamp(1px, 4vw, 15px)' }}>ความเร็วเฉลี่ยรายชั่วโมง</Typography.Title>
      </section>
      <section className='mt-2'>
        {renderChart}
      </section>
    </div>
  )
}

export default React.memo(ChartVehicleAvgSpeed)
