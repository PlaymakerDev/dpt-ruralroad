import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Spin } from 'antd'
const SpecMap = dynamic(() => import('../map/SpecMap'), { ssr: false })

const INIT_POSITION = { location: [13.736717, 100.523186], zoom: 5 }
const MapSection = (props) => {
  const { data, loading } = props
  const [position, setPosition] = useState(INIT_POSITION)

  const renderSpecMap = useMemo(() => {
    if (!loading) {
      return (
        <SpecMap
          center={position.location}
          zoom={position.zoom}
          car={data.car_list}
          road={data.geom_road}
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          <SpecMap
            center={position.location}
            zoom={position.zoom}
            car={data.car_list}
            road={data.geom_road}
          />
        </Spin>
      )
    }
  }, [loading, data, position])


  return (
    <div>
      {renderSpecMap}
    </div>
  )
}

export default React.memo(MapSection)
