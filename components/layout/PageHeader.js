import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, TruckOutlined, FileTextOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons'
import DPTLogo from '@/public/images/dpt-logo.svg'
import Image from 'next/image'
import styles from '@/styles/components/layout/Layout.module.css'

const { Header } = Layout


const PageHeader = (props) => {
  const { collapsed, setCollapsed } = props

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
    <Header className={styles.header}>
      <div className={styles.sidebar}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </div>
      <Image
        src={DPTLogo}
        alt='nav-icon'
        width={50}
        height={50}
        className={`${styles.navbar} block m-auto`}
      />
      <Menu
        theme='dark'
        mode='horizontal'
        items={items}
        style={{
          flex: 1,
          minWidth: 0,

        }}
        className={styles.navbar}
      />
    </Header >
  )
}

export default React.memo(PageHeader)
