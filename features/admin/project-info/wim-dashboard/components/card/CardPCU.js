import React from 'react'
import { useWIMContext } from '../../context'
import { useAppSelector } from '@/store/hooks'
import { TruckIcon } from '@/components/icon'
import stf from '@/utils/stringformat'

const CardPCU = (props) => {
  const { } = props
  const { loadingPCU } = useWIMContext()
  const data = useAppSelector(state => state.dashboard.pcu)

  return (
    <div className='pcu-container p-5 rounded-lg'>
      <div className='flex gap-5 flex-wrap'>
        <TruckIcon width={55} height={48} color='#FFFFFF' />
        <div className='flex flex-col flex-grow justify-between flex-wrap'>
          <div className='flex flex-col'>
            <h1 className='text-[clamp(1px, 4vw, 15px)]'>PCU Average</h1>
            <p className='text-[clamp(1px, 4vw, 15px)]'><span className='text-yellow-500 text-2xl font-bold'>{stf(data.data.total_pcu).normal() || 0}</span></p>
          </div>
        </div>
      </div>
    </div>)
}

export default React.memo(CardPCU)
