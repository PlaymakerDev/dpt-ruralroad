import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Spin } from 'antd'
const SpecMap = dynamic(() => import('../map/SpecMap'), { ssr: false })

const INIT_POSITION = { location: [13.736717, 100.523186], zoom: 5 }
const MapSection = (props) => {
  const { data, detail, loading, loadDetail } = props
  const [position, setPosition] = useState(INIT_POSITION)

  const renderSpecMap = useMemo(() => {
    if (!loading || !loadDetail) {
      return (
        <SpecMap
          center={position.location}
          zoom={position.zoom}
          car={data.car_list}
          road={detail.position}
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          <SpecMap
            center={position.location}
            zoom={position.zoom}
            car={data.car_list}
            road={detail.position}
          />
        </Spin>
      )
    }
  }, [data, detail, loading, loadDetail, position])


  return (
    <div>
      {renderSpecMap}
    </div>
  )
}

export default React.memo(MapSection)
