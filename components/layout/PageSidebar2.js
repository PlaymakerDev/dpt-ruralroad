import React, { useState } from 'react';
import { Layout, Menu , ConfigProvider } from 'antd'
import { HomeOutlined, TruckOutlined, FileTextOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons'
import DPTLogo from '@/public/images/dpt-logo.svg'
import Image from 'next/image'
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons'; 

const { Header } = Layout

const PageSidebar2 = (props) => {
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

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
    
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3rem',
          width: '100%',
        }}
      >
        <Image
          src={DPTLogo}
          alt='nav-icon'
          width={50}
          height={50}
          className='block'
        />
        <Button type="primary" onClick={showDrawer} className='bg-blue-900' icon={<MenuOutlined />}/>
      </Header>


      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={visible}
        style={{ backgroundColor: '#001529', color: 'white', padding: 0 }}
        size={'default'}
      >
        <section className='my-2'>
          <Image
            src={DPTLogo}
            alt='nav-icon'
            width={100}
            height={100}
            className='block m-auto'
          />
        </section>
        <section className='w-full'>
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
      </Drawer>
    </>
  )
}

export default React.memo(PageSidebar2)
