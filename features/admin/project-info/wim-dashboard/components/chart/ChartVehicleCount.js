import React, { useCallback, useMemo } from 'react'
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

const ChartVehicleCount = (props) => {
  const { data } = props

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
    const count = [];
    // ASSIGN DATA
    data?.column[0]?.forEach((currentData) => {
      categories.push(dayjs(currentData, 'HH:mm').locale('th').format('HH:mm'));
    })

    data?.value[0]?.forEach((currentData) => {
      count.push(Number(currentData));
    })
    // RETURN VALUE
    return {
      categories,
      series: [
        {
          name: 'คัน',
          data: count
        },
      ]
    }
  }, [data]);

  // const findLastIndexWithData = useCallback((dataArray) => {
  //   for (let i = dataArray.length - 1; i >= 0; i--) {
  //     if (dataArray[i] > 0) {
  //       return i;
  //     }
  //   }
  //   return dataArray.length - 1; // Default to last index if no data found
  // }, [])

  // RENDER CHART
  const renderChart = useMemo(() => {
    return (
      <Chart
        type='bar'
        series={barDataNormalize.series || []}
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
            //   return barDataNormalize?.series.length <= 1 ? "" : Number(val);
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
            fontFamily: 'IBMPlexSansThai-Regular, Arial, sans-serif',
            offsetX: 0,
            offsetY: 10,
          },
          xaxis: {
            categories: barDataNormalize?.categories || [],
            tickPlacement: 'on',
            tickAmount: 25,
            labels: {
              style: {
                colors: '#FFFFFF80'
              },
              rotate: 0,
              trim: true,
              // hideOverlappingLabels: true,
              // formatter: (value, timestamp, opts) => {
              //   // Find the index of this value in categories
              //   const index = barDataNormalize.categories.indexOf(value);

              //   // Get the data array
              //   const seriesData = barDataNormalize.series[0]?.data || [];

              //   // Check if there's data for this category
              //   if (index !== -1 && seriesData[index] > 0) {
              //     return value; // Show the label
              //   } else {
              //     return ''; // Hide the label
              //   }
              // },
              // axisBorder: {
              //   show: true
              // },
            },
            // This is the key part - limit the visible range
            // min: 0,
            // max: findLastIndexWithData(barDataNormalize?.series[0]?.data || [])
            min: 0,
            max: 3,
            range: 3
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
                return barDataNormalize?.categories[dataPointIndex];
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
  }, [barDataNormalize])

  return (
    <div>
      <section>
        <Typography.Title level={4} className='!m-0' style={{ fontSize: 'clamp(1px, 4vw, 15px)' }}>ข้อมูลจราจรรายชั่วโมง</Typography.Title>
      </section>
      <section className='mt-2'>
        {renderChart}
      </section>
    </div>
  )
}

export default React.memo(ChartVehicleCount)
