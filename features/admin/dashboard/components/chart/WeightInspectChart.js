import React from 'react'
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
      position: 'top',
      horizontalAlign: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
  }

  return (
    <div>
      <Chart
        series={series}
        options={options}
        type='area'
      />
    </div>
  )
}

export default React.memo(WeightInspectChart)
