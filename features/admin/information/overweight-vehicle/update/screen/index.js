import { Typography } from 'antd'
import React from 'react'

const UpdateScreen = (props) => {
  const { id } = props

  return (
    <section>
      <Typography.Title level={3}>ข้อมูลบันทึกจับกุม</Typography.Title>
      {id}
    </section>
  )
}

export default React.memo(UpdateScreen)
