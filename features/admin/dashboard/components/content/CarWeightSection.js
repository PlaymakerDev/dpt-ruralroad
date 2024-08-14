import { Card } from 'antd'
import React from 'react'
import WeightUnitInspectChart from '../chart/WeightUnitInspectChart'

const CarWeightSection = (props) => {
  const { } = props

  return (
      <Card className='bg-gradient border-lightblue !w-full !h-full'>
        <WeightUnitInspectChart />
      </Card>
  )
}

export default React.memo(CarWeightSection)
