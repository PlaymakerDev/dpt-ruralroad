import React from 'react'
import { Typography } from 'antd'
import { FileOutlined } from '@ant-design/icons'

const DetailCard = (props) => {
  const { data } = props

  return (
    <div className='card-container rounded-lg'>
      <div className='flex items-center gap-5'>
        <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
          <FileOutlined className='!text-xl'/>
        </figure>
        <Typography.Text className='!text-lg'>{data.description}</Typography.Text>
      </div>
    </div>
  )
}

export default React.memo(DetailCard)
