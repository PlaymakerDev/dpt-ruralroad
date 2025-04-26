import React, { useCallback } from 'react'
import Stat from '../card/Stat'
import { LongdoMap, map, longdo } from '@/components/map/LongdoMap'

const MAP_KEY = "f7ba675880ccab7ac7fd0a65f1b33553"

const OverviewSection = (props) => {
  const { data } = props

  const initMap = useCallback(() => {
    if (map && longdo) {
      map.Layers.setBase(longdo.Layers.GRAY);
      // Add other map configurations here
    }
  }, [])

  return (
    <div>
      <section>
        <figure className='flex-1 h-[calc(100vh-302px)] min-h-[400px]'>
          <LongdoMap
            id="longdo-map"
            mapKey={MAP_KEY}
            callback={initMap()}
          />
        </figure>
      </section>
      <section className='mt-5'>
        <Stat
          stationId={data?.id}
          data={data}
        />
      </section>
    </div>
  )
}

export default React.memo(OverviewSection)
