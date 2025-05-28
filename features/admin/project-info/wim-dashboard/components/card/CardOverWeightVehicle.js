import React from 'react'
import Image from 'next/image'
import RedTruck from '@/public/images/red-truck.svg'
import stf from '@/utils/stringformat'

const CardOverWeightVehicle = (props) => {
  const { over = 0 } = props

  return (
    <div className='card-container p-5 rounded-lg'>
      <div className='flex gap-5 flex-wrap'>
        <Image
          src={RedTruck}
          alt='truck-inspect'
          width={60}
          height={60}
        />
        <div className='flex flex-col flex-grow justify-between flex-wrap'>
          <h1 className='text-[clamp(1px, 4vw, 15px)]'>รถน้ำหนักเกิน</h1>
          <p className='text-[clamp(1px, 4vw, 15px)]'><span className='text-red-500 text-2xl font-bold'>{stf(over).normal() || '-'}</span> คัน</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CardOverWeightVehicle)
