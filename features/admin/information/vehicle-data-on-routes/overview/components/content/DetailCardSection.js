import React from 'react'
import { VehicleData, VehicleOnRoute } from '../card'

const DetailCardSection = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <VehicleData />
      </section>
      <section className='mt-5'>
        <VehicleOnRoute />
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
