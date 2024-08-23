import React from 'react'
import { Typography } from 'antd'
import { PreviewContent } from '../content'

const MainContent = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <Typography.Title level={3} className='!m-0'>สรุปข้อมูลรถเข้าชั่ง</Typography.Title>
      </section>
      <section className='mt-5'>
        <PreviewContent />
      </section>
    </div>
  )
}

export default React.memo(MainContent)
