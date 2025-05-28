import React from 'react'
import Image from 'next/image'
import GreenTruck from '@/public/images/green-truck.svg'
import stf from '@/utils/stringformat'
import { useRouter } from 'next/router'

const CardTotalVehicle = (props) => {
  const { total = 0, stationId, data } = props
  const router = useRouter()

  return (
    <div
      className='stat-container hover:bg-[#56eebb20] p-5 rounded-lg transition-colors duration-200 hover:cursor-pointer'
      onClick={() => router.push({
        pathname: `/admin/project-info/wim-detail/${stationId}`,
        query: {
          prev_name: data.name
        }
      })}
    >
      <div className='flex gap-5 flex-wrap'>
        <Image
          src={GreenTruck}
          alt='truck-inspect'
          width={60}
          height={60}
        />
        <div className='flex flex-col flex-grow justify-between flex-wrap'>
          <div className='flex flex-col'>
            <h1 className='text-[clamp(1px, 4vw, 15px)]'>รถเข้าชั่งวันนี้</h1>
            <p className='text-[clamp(1px, 4vw, 15px)]'><span className='text-green-500 text-2xl font-bold'>{stf(total).normal() || 0}</span> คัน</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CardTotalVehicle)
