import React from 'react'
import Image from 'next/image'
import YellowTruck from '@/public/images/yellow-truck.svg'
import stf from '@/utils/stringformat'

const CardPercentageOverVehicle = (props) => {
  const { percentage = 0 } = props

  return (
    <div className='card-container p-5 rounded-lg'>
      <div className='flex gap-5 flex-wrap'>
        <Image
          src={YellowTruck}
          alt='truck-inspect'
          width={60}
          height={60}
        />
        <div className='flex flex-col flex-grow justify-between flex-wrap'>
          <h1 className='text-[clamp(1px, 4vw, 15px)]'>รถน้ำหนักเกิน 10%</h1>
          <p className='text-[clamp(1px, 4vw, 15px)]'><span className='text-yellow-500 text-2xl font-bold'>{stf(percentage).normal() || '-'}</span> คัน</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CardPercentageOverVehicle)
