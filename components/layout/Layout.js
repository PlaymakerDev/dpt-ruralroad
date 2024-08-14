import React from 'react'
import { Header } from '../layout'
import { Layout as PageLayout, Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const Layout = (props) => {
  const { children } = props

  const items = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'หน้าหลัก',
    },
    {
      key: '2',
      icon: <HomeOutlined />,
      label: 'ข้อมูลรถเข้าชั่ง',
    },
    {
      key: '3',
      icon: <HomeOutlined />,
      label: 'ข้อมูล',
    },
    {
      key: '4',
      icon: <HomeOutlined />,
      label: 'ตั้งค่าระบบ',
    },
    {
      key: '5',
      icon: <HomeOutlined />,
      label: 'กล้องวงจรปิด',
    },
  ]

  return (
    <main>
      <Header />
      <div className='mx-5'>
        {children}
      </div>
    </main>
  )
}

export default React.memo(Layout)
