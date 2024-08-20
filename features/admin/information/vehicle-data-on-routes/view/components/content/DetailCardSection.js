import React from 'react'
import { VehicleData, RouteData } from '../card'

const DetailCardSection = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <VehicleData />
      </section>
      <section className='mt-5'>
        <RouteData />
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
