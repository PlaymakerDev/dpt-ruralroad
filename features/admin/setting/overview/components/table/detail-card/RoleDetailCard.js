import React, { useMemo } from 'react'
import { Typography } from 'antd'
import { DeleteOutlined, EditFilled, UserOutlined } from '@ant-design/icons'
import Edit from '@/components/icon/Edit'
import Bin from '@/components/icon/Bin'

const DetailCard = (props) => {
  const { data, setOpen, confirmDelete } = props

  return (
    <div className='card-container rounded-lg'>
      <div className='flex items-center'>
        <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
          <UserOutlined className='!text-xl !text-white' />
        </figure>
        <section className='w-full flex items-center flex-wrap justify-between px-5 py-3 gap-3'>
          <Typography.Text className='!text-lg'>{data?.p_name}</Typography.Text>
          <div className='flex flex-wrap items-center gap-5'>
            <Edit className='!cursor-pointer' onClick={() => setOpen({ open: true, type: 'edit', data: data })} />
            {/* <Bin className='!cursor-pointer !text-[#FF4a4a]' onClick={() => setOpen({ open: true, type: 'delete', data: data })} /> */}
            <Bin className='!cursor-pointer !text-[#FF4a4a]' onClick={() => confirmDelete(data)} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default React.memo(DetailCard)
