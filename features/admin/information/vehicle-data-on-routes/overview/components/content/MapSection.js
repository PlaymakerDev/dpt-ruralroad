import React from 'react'
import { RegionMap } from '../map'

const MapSection = (props) => {
  const { } = props

  return (
    <div className='h-full'>
      <RegionMap />
    </div>
  )
}

export default React.memo(MapSection)
