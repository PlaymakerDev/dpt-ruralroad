import React from 'react'
import { Card } from 'antd'
import WeightInspectChart from '../chart/WeightInspectChart'

const CarDetailSection = (props) => {
  const { } = props

  return (
    <Card>
      <WeightInspectChart />
    </Card>
  )
}

export default React.memo(CarDetailSection)
