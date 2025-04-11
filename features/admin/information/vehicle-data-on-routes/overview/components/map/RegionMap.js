import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/map/Map.js'), { ssr: false })

const RegionMap = (props) => {
  const { } = props

  const renderMap = useMemo(() => {
    return (
      <Map
        center={[13.736717, 100.523186]}
        zoom={5}
        data={[
          {
            speed: 0,
            coordinates: {
              point: {
                latitude: 13.736717,
                longitude: 100.523186
              }
            }
          }
        ]}
        line={{
          geom: {
            coordinates: [[13.736717, 100.523186], [13.736717, 100.523186]]
          }
        }}
        defaultIcon
      />
    )
  }, [])

  return (
    <figure className='rounded-lg h-full'>
      {renderMap}
    </figure>
  )
}

export default React.memo(RegionMap)
