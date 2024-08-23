import React from 'react'
import { Avatar, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from '@/styles/components/layout/new-layout/Layout.module.css'

const SidebarHeader = (props) => {
  const { title, description, extra } = props

  return (
    <div className='flex flex-col flex-wrap items-center justify-center gap-3'>
      <Avatar
        size={64}
        icon={<UserOutlined />}
        className={styles.avatarIcon}
        // style={{ backgroundColor: 'rgb(255 206 215 / 31%)' }}
        style={{ backgroundColor: '#FFFFFF30' }}
      />
      <section className='text-center'>
        <Typography.Title level={5} className='!m-0'>{title}</Typography.Title>
        <Typography.Text className='!text-white'>{description}</Typography.Text>
      </section>
      {extra}
    </div>
  )
}

export default React.memo(SidebarHeader)
