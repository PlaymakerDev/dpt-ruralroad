import React from 'react'
import { Typography } from 'antd'
import { FileOutlined } from '@ant-design/icons'
import Link from 'next/link'

const DetailCard = (props) => {
  const { data, url } = props

  return (
    <Link href={url} legacyBehavior>
      <div className='card-container rounded-lg cursor-pointer'>
        <div className='flex items-center gap-5'>
          <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
            <FileOutlined className='!text-xl' />
          </figure>
          <Typography.Text className='!text-lg'>{data.description}</Typography.Text>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(DetailCard)
