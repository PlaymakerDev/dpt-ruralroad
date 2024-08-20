import React, { useMemo } from 'react'
import { Typography } from 'antd'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'

const DetailCard = (props) => {
  const { data, setOpen } = props

  return (
    <div className='container rounded-lg'>
      <div className='flex items-center'>
        <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
          <UserOutlined className='!text-xl' />
        </figure>
        <section className='w-full flex items-center flex-wrap justify-between px-5 py-3 gap-3'>
          <Typography.Text className='!text-lg'>{data.description}</Typography.Text>
          <div className='flex flex-wrap items-center gap-5'>
            <EditOutlined className='!cursor-pointer' onClick={() => setOpen({ open: true })} />
            <DeleteOutlined className='!cursor-pointer !text-[#FF4a4a]' />
          </div>
        </section>
      </div>
    </div>
  )
}

export default React.memo(DetailCard)
