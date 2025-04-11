import React, { useMemo } from 'react'
import { Typography } from 'antd'
import { DeleteOutlined, EditFilled, FileOutlined } from '@ant-design/icons'
import Cardboard from "@/components/icon/Cardboard";
import Edit from '@/components/icon/Edit';
import Bin from '@/components/icon/Bin';

const DetailCard = (props) => {
  const { data, setOpen, confirmDelete } = props

  return (
    <div className='card-container rounded-lg'>
      <div className='flex items-center'>
        <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
          <Cardboard width='1.5rem' height='1.5rem' className='block m-auto' />
        </figure>
        <section className='w-full flex items-center flex-wrap justify-between px-5 py-3 gap-3'>
          <Typography.Text className='!text-lg'>{data.goods_name}</Typography.Text>
          <div className='flex flex-wrap items-center gap-5'>
            <Edit className='!cursor-pointer' onClick={() => setOpen({ open: true, data: data, type: 'edit' })} />
            {/* <Bin className='!cursor-pointer !text-[#FF4a4a]' onClick={() => setOpen({ open: true, data: data, type: 'delete' })} /> */}
            <Bin className='!cursor-pointer !text-[#FF4a4a]' onClick={() => confirmDelete(data)} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default React.memo(DetailCard)
