import React from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, TruckOutlined, FileTextOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons'
import DPTLogo from '@/public/images/dpt-logo.svg'
import Image from 'next/image'

const { Sider } = Layout

const PageSidebar = (props) => {
  const { } = props

  const items = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'หน้าหลัก',
    },
    {
      key: '2',
      icon: <TruckOutlined />,
      label: 'ข้อมูลรถเข้าชั่ง',
    },
    {
      key: '3',
      icon: <FileTextOutlined />,
      label: 'ข้อมูล',
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      label: 'ตั้งค่าระบบ',
    },
    {
      key: '5',
      icon: <VideoCameraOutlined />,
      label: 'กล้องวงจรปิด',
    },
  ]

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={false}
      style={{
        height: '100%',
      }}
    >
      <section className='my-8'>
        <Image
          src={DPTLogo}
          alt='nav-icon'
          width={50}
          height={50}
          className='block m-auto'
        />
      </section>
      <section className='m-3'>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,

          }}
        />
      </section>
    </Sider>
  )
}

export default React.memo(PageSidebar)
