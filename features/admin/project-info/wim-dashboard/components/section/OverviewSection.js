import React, { useCallback } from 'react'
import Stat from '../card/Stat'
import DisplayMap from '../map/DisplayMap'

const OverviewSection = (props) => {
  const { data } = props

  return (
    <div>
      {/* <section>
        <figure className='flex-1 h-[calc(100vh-302px)] min-h-[400px]'>
          <DisplayMap
            stationId={data?.id}
            stationType={data?.type}
          />
        </figure>
      </section> */}
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
