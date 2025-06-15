import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import Image from 'next/image'
import GreenTruck from '@/public/images/green-truck.svg'
import YellowTruck from '@/public/images/yellow-truck.svg'
import RedTruck from '@/public/images/red-truck.svg'
import stf from '@/utils/stringformat'

const VehicleData = (props) => {
  const { data, loading } = props

  return (
    <div className='card-container rounded-md grid grid-cols-3 gap-1 p-2'>
      <figure className='flex flex-col justify-between border-[#56E4EE50] border-r'>
        <h1 className='text-center font-bold'>รถวิ่งตามปกติ</h1>
        <Image
          src={GreenTruck}
          alt='truck-inspect'
          className='mx-auto'
        />
        <section className='flex flex-col text-center'>
          <p>จำนวนรถ</p>
          <div className='flex justify-center items-baseline gap-2'>
            <p className='text-2xl'>{loading ? 0 : (stf(data.normal_vehicle_count).normal() || 0)}</p>
            <p>คัน</p>
          </div>
        </section>
      </figure>

      <figure className='flex flex-col justify-between border-[#56E4EE50] border-r'>
        <h1 className='text-center font-bold'>รถที่จอดอยู่กับที่</h1>
        <Image
          src={YellowTruck}
          alt='truck-inspect'
          className='mx-auto'
        />
        <section className='flex flex-col text-center'>
          <p>จำนวนรถ</p>
          <div className='flex justify-center items-baseline gap-2'>
            <p className='text-2xl'>{loading ? 0 : (stf(data.not_moving_count).normal() || 0)}</p>
            <p>คัน</p>
          </div>
        </section>
      </figure>
      <figure className='flex flex-col justify-between border-[#56E4EE50]'>
        <h1 className='text-center font-bold'>รถที่มีประวัติน้ำหนักเกิน</h1>
        <Image
          src={RedTruck}
          alt='truck-inspect'
          className='mx-auto'
        />
        <section className='flex flex-col text-center'>
          <p>จำนวนรถ</p>
          <div className='flex justify-center items-baseline gap-2'>
            <p className='text-2xl'>{loading ? 0 : (stf(data.over_weight_history).normal() || 0)}</p>
            <p>คัน</p>
          </div>
        </section>
      </figure>
    </div>
  )
}

export default React.memo(VehicleData)
