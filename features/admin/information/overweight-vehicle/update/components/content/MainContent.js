import React from 'react'
import { Button, Typography } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { FormContent } from '../content'

const MainContent = (props) => {
  const { } = props

  return (
    <div>
      <section className='flex flex-wrap items-center justify-between gap-5'>
        <Typography.Title level={3} className='!m-0'>ข้อมูลบันทึกจับกุม</Typography.Title>
        <Button
          type='primary'
          size='large'
          className='!w-full lg:!w-auto'
          icon={<FileTextOutlined />}
        >
          ดูรายการบันทึกการจับกุม
        </Button>
      </section>
      <section className='mt-5'>
        <FormContent />
      </section>
    </div>
  )
}

export default React.memo(MainContent)
