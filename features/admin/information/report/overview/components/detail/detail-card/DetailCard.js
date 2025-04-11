import React from 'react'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import { FileOutlined } from '@ant-design/icons'
import menu from '@/menu/admin'
// import Link from 'next/link'

const DetailCard = (props) => {
  const { data, url, tabKey } = props
  const router = useRouter()


  const handleClick = (e) => {
    e.preventDefault();

    if (data?.key === '10') {
      router.push({
        pathname: '/admin/information/collaboration-and-integration'
      })
    }
    else if (data?.menu && data?.tab) {
      router.push({
        pathname: '/admin/vehicle-weight/overview',
        query: {
          menu: data?.menu,
          key: data?.tab,
        }
      })
    }
    else {
      router.push({
        pathname: url,
        query: {
          urlPreview: data.urlPreview,
          description: data.description,
          key: data.key,
          // tabKey: data.tabKey
          tabKey: tabKey
        }
      })
    }


    e.preventDefault()
  }

  return (
    <a onClick={handleClick}>
      <div className='card-container rounded-lg cursor-pointer'>
        <div className='flex items-center gap-5'>
          <figure className='bg-[#FFFFFF17] p-5 rounded-l-lg'>
            <FileOutlined className='!text-xl' />
          </figure>
          <Typography.Text className='!text-lg'>{data.description}</Typography.Text>
        </div>
      </div>
    </a>
  )
}

export default React.memo(DetailCard)
