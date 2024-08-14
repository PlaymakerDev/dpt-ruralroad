import { Card } from 'antd'
import React from 'react'
import WeightUnitInspectChart from '../chart/WeightUnitInspectChart'

const CarWeightSection = (props) => {
  const { } = props

  return (
    <div>
      <Card>
        <WeightUnitInspectChart />
      </Card>
    </div>
  )
}

export default React.memo(CarWeightSection)
